import React, { FC, useEffect } from 'react'
import { QuestionParagraphPropsType } from './interface'
import { Form, Input, Checkbox } from 'antd'

const { TextArea } = Input //从antd的Input可以解构出textarea

const PropComponent: FC<QuestionParagraphPropsType> = (props: QuestionParagraphPropsType) => {
  const { text, isCenter, onChange, disabled } = props
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({ text, isCenter })
  }, [text, isCenter])

  function handleValuesChange() {
    // 使用onChange
    if (onChange) {
      onChange(form.getFieldsValue())
    }
  }

  return (
    <Form
      onValuesChange={handleValuesChange}
      form={form}
      disabled={disabled}
      layout="vertical"
      initialValues={{ text, isCenter }}
    >
      <Form.Item
        label="段落内容"
        name="text"
        rules={[{ required: true, message: '请输入段落内容' }]}
      >
        <TextArea />
      </Form.Item>
      <Form.Item name="isCenter" valuePropName="checked">
        <Checkbox>居中显示</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
