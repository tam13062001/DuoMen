const { registerPlugin } = wp.plugins;
const { PluginSidebar } = wp.editor;
const { TextareaControl, TextControl } = wp.components;
const { PanelBody, SelectControl } = wp.components;
const { useSelect, useDispatch, subscribe, select, dispatch } = wp.data;
const { parse, createBlock } = wp.blocks
const { useState, useEffect, useRef, useMemo, useCallback } = wp.element;

console.log('load multilang editor', multilangData)

const defaultLanguage = multilangData.defaultLanguage;

const MultiLangEditor = () => {
    const { editPost } = useDispatch("core/editor");
    const [currentLang, setCurrentLang] = useState(() => {
        const url = new URL(window.location.href);
        const lang = url.searchParams.get('lang')
        return lang || defaultLanguage || 'vi'
    });
    const languages = useSelect((select) => select("core").getEntityRecords("taxonomy", "language") || []);
    const meta = useSelect((select) => select("core/editor").getEditedPostAttribute("meta"), [currentLang]);
    const getBlocks = () => select('core/block-editor').getBlocks();
    const getTitle = () => select('core/editor').getEditedPostAttribute('title');
    const getContent = () => select('core/editor').getEditedPostAttribute('content');

    const [ready, setReady] = useState(false)

    // Fetch available languages
    const languageOptions = useMemo(() => {
        const result = []
        languages.forEach(lang => {
            result.push({ label: lang.name, value: lang.slug })
        })
        return result
    }, [languages])

    const updateLanguageBanner = useCallback((language) => {
        const editor = document.querySelector('.editor-styles-wrapper')
        if (editor) {
            let langDiv = editor.querySelector('#rocket_language_div')
            if (langDiv) {
                langDiv.remove()
            }
            langDiv = document.createElement('div')
            langDiv.id = 'rocket_language_div'
            langDiv.innerHTML = (`You are editing the language version: ${currentLang || 'default'}`)
            Object.assign(langDiv.style, {
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 10,
                backgroundColor: '#cccccc',
                width: '100%',
                textAlign: 'center',
                fontSize: '1rem',
                padding: 4
            })
            editor.appendChild(langDiv)
        }
    }, [])

    const onMetaChange = (values) => {
        editPost({ meta: values })
    }

    useEffect(() => {
        const unsubscribe = subscribe(() => {
            setTimeout(() => {
                setReady(true)
                unsubscribe()
            }, 50)
        })
        return () => unsubscribe()
    }, []);

    const loadEditorContent = (language) => {
        const meta = select("core/editor").getEditedPostAttribute("meta")
        let title
        let content
        if (language) {
            const contentKey = `_content_${currentLang}`
            const titleKey = `_title_${currentLang}`
            title = meta[titleKey]
            content = meta[contentKey]
        }

        console.log('load title by language:', language, title, content)
        editPost({ title })
        try {
            if (content) {
                const blocks = parse(content)
                console.log('load blocks', blocks)
                dispatch('core/block-editor').resetBlocks(blocks)
            }
        } catch (e) {
            console.warn('Failed to parse block content')
            console.error(e)
        }
    }

    useEffect(() => {
        if (ready) {
            loadEditorContent(currentLang)
            updateLanguageBanner(currentLang)
        }
    }, [currentLang, ready]);

    useEffect(() => {
        let previousTitle = select('core/editor').getEditedPostAttribute('title');
        let previousContent = select('core/editor').getEditedPostAttribute('content');
        const unsubscribe = subscribe(() => {
            // const isSaving = select('core/editor').isSavingPost();
            // const isAutosaving = select('core/editor').isAutosavingPost();
            const currentTitle = select("core/editor").getEditedPostAttribute("title")
            const currentContent = select("core/editor").getEditedPostAttribute("content")
            if ((currentTitle !== previousTitle || currentContent !== previousContent) && currentLang) {
                previousTitle = currentTitle
                previousContent = currentContent

                const titleKey = `_title_${currentLang}`
                const contentKey = `_content_${currentLang}`
                editPost({
                    meta: {
                        [titleKey]: currentTitle,
                        [contentKey]: currentContent
                    }
                })
            }
        })
        return () => unsubscribe()
    }, [currentLang]);

    useEffect(() => {
        // if (defaultLanguage) {
        //     const titleKey = `_title_${defaultLanguage}`
        //     const contentKey = `_content_${defaultLanguage}`
        //     if (!meta[titleKey] && !meta[contentKey]) {
        //         editPost({
        //             meta: {
        //                 [titleKey]: select('core/editor').getEditedPostAttribute('title'),
        //                 [contentKey]: select('core/editor').getEditedPostAttribute('content')
        //             }
        //         })
        //     }
        // }
    }, []);

    useEffect(() => {
        // Inject a div into the post editor to show the current language
        const divId = 'rocket_current_language'
        let dom = document.getElementById(divId)
        if (!dom) {
            const container = document.querySelector('.components-notice-list');
            dom = document.createElement('div');
            dom.id = divId;
            dom.style.padding = "5px 10px";
            dom.style.background = "#f0f0f0";
            dom.style.borderRadius = "5px";
            dom.style.fontWeight = "bold";
            container.appendChild(dom);
        }
        dom.innerText = `You are editing language version: ${currentLang}`
    }, [currentLang])

    return (
        <PluginSidebar name="multilang-sidebar" title="Language Settings">
            <PanelBody title="Select Language" initialOpen={true}>
                <SelectControl
                    label="Editing Language"
                    value={currentLang}
                    options={languageOptions}
                    onChange={setCurrentLang}
                />
                <div>Select a language, then config how page interact with the language</div>
            </PanelBody>
            <PanelBody title={'Language Configuration'}>
                {/*<TextControl*/}
                {/*    label={'Custom Slug'}*/}
                {/*    value={meta[`_slug_${currentLang}`]}*/}
                {/*    onChange={value => onMetaChange({ [`_slug_${currentLang}`]: value })}*/}
                {/*/>*/}
                <TextareaControl
                    label={'Custom Yoast SEO Title'}
                    value={meta[`_yoast_title_${currentLang}`]}
                    onChange={value => onMetaChange({ [`_yoast_title_${currentLang}`]: value })}
                />
                <TextareaControl
                    label={'Custom Yoast SEO Description'}
                    value={meta[`_yoast_description_${currentLang}`]}
                    onChange={value => onMetaChange({ [`_yoast_description_${currentLang}`]: value })}
                />
            </PanelBody>
        </PluginSidebar>
    );
};

registerPlugin("multilang-sidebar", { render: MultiLangEditor, icon: 'translation' });
