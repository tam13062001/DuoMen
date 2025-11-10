import React from 'react'
import {BlockEditProps} from '@wordpress/blocks'
import {useBlockProps} from '@wordpress/block-editor'

export default function withBlock<T = any>(Component: React.FC<BlockEditProps<T>>) {
  return (props: BlockEditProps<T>) => {
    const blockProps = useBlockProps();
    return (
      <div {...blockProps} style={{ border: '1px dashed gray', position: 'relative', padding: 16 }}>
        <span
          style={{
            background: 'white',
            transform: 'translateY(-50%)',
            position: 'absolute',
            top: 0,
            left: 16,
            padding: '0 4px',
            fontSize: 12,
            zIndex: 10
        }}
        >
          {blockProps['data-title']}
        </span>
        <Component {...props} />
      </div>
    )
  }
}