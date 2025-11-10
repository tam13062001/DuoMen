import {BlockEditProps, BlockSaveProps, registerBlockType} from '@wordpress/blocks'
import React from 'react'
import {InnerBlocks} from '@wordpress/block-editor'

type CustomPropsOptions = {
  edit: React.FC<BlockEditProps<any>>
  save?: React.FC<BlockSaveProps<any>>
}

export function registerDynamicBlock<AttributeType = any>(metadata: any, customBlockOptions: CustomPropsOptions) {
  registerBlockType<AttributeType>(metadata.name, {
    category: 'unknown',
    apiVersion: 2,
    icon: 'block-default',
    ...metadata,
    ...customBlockOptions
  })
}

export function registerBlockWithInnerContent(metadata: any, customBlockOptions: CustomPropsOptions) {
  return registerDynamicBlock(metadata, {
    ...customBlockOptions,
    save: props => <InnerBlocks.Content />
  })
}