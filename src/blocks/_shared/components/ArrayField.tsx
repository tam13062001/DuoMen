import {Button, Col, Divider, Flex, Form, FormListFieldData, Grid, Input, Row} from 'antd'
import {DeleteOutlined, PlusOutlined} from '@ant-design/icons'
import React from 'react'
import {useCallback} from '@wordpress/element'

type ArrayFieldProps = {
  name: string | string[]
  nameField?: string
  addLabelText?: string
  renderValue?: (field: FormListFieldData) => React.ReactNode
  value?: any[]
  label?: string
  onChange?(values: any[]): void
}

export default function ArrayField(props: ArrayFieldProps) {
  const renderValue = useCallback((field: FormListFieldData) => {
    if (typeof props.renderValue === 'function') {
      return props.renderValue(field)
    }
    return (
      <Form.Item label={'Value'} name={[field.name, 'value']}>
        <Input.TextArea />
      </Form.Item>
    )
  }, [props.renderValue])

  return (
    <Form.Item label={props.label}>
      <Form.List name={props.name}>
        {
          (fields, operation, meta) => (
            <div>
              <Row gutter={16}>
                {
                  fields.map((field, index) => {
                    return (
                      <Col span={12}>
                        <Form.Item
                          labelCol={{ span: 24 }}
                          label={(
                            <Flex justify={'space-between'} align={'center'}>
                              <div>#{index + 1} Name</div>
                              <div>
                                <Button
                                  size={'small'}
                                  type={'link'}
                                  danger
                                  onClick={() => operation.remove(index)}
                                >
                                  Delete
                                </Button>
                              </div>
                            </Flex>
                          )}
                          name={[field.name, props.nameField || 'name']}
                        >
                          <Input />
                        </Form.Item>
                        { renderValue(field) }
                      </Col>
                    )
                  })
                }
              </Row>
              <Button
                type={'primary'}
                icon={<PlusOutlined />}
                onClick={() => operation.add({ name: '', value: ''})}
              >
                { props.addLabelText || 'Add' }
              </Button>
            </div>
          )
        }
      </Form.List>
    </Form.Item>
  )
}