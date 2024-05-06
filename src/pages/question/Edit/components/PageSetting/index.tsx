import React, { FC, useEffect } from 'react'
import useGetPageInfo from '@/hooks/useGetPageInfo'
import { Form, Input } from 'antd'
import { resetPageInfo } from '@/store/pageInfoReducer'
import { useDispatch } from 'react-redux'

const { TextArea } = Input

const PageSetting: FC = () => {
  const pageInfo = useGetPageInfo()
  const { title, desc, js, css } = pageInfo
  const [form] = Form.useForm()
  const dispatch = useDispatch()

  // 实时更新表单内容
  useEffect(() => {
    form.setFieldsValue({ title, desc, js, css })
  }, [title, desc, js, css])

  function handleValuesChange() {
    dispatch(resetPageInfo(form.getFieldsValue()))
  }

  return (
    <Form
      form={form}
      onValuesChange={handleValuesChange}
      layout="vertical"
      initialValues={{ title, desc, js, css }}
    >
      <Form.Item label="页面标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input placeholder="请输入标题" />
      </Form.Item>
      <Form.Item label="页面描述" name="desc">
        <TextArea placeholder="问卷描述..." />
      </Form.Item>
      <Form.Item label="样式代码" name="css">
        <TextArea placeholder="输入css样式代码" />
      </Form.Item>
      <Form.Item label="脚本代码" name="js">
        <TextArea placeholder="输入js脚本代码" />
      </Form.Item>
    </Form>
  )
}

export default PageSetting
