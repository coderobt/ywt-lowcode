import React, { FC, useEffect } from 'react'
import { QuestionCheckboxPropsType, OptionType } from './interface'
import { Form, Input, Checkbox, Space, Button } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { nanoid } from 'nanoid'

const PropComponent: FC<QuestionCheckboxPropsType> = (props: QuestionCheckboxPropsType) => {
  const { title, isVertical, list = [], disabled, onChange } = props
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({ title, isVertical, list })
  }, [title, isVertical, list])

  function handleValuesChange() {
    if (onChange == null) return

    const newValues = form.getFieldsValue() as QuestionCheckboxPropsType

    if (newValues.list) {
      newValues.list = newValues.list.filter(opt => !(opt.text == null))
    }

    const { list = [] } = newValues
    list.forEach(opt => {
      if (opt.value) return
      opt.value = nanoid(5)
    })

    onChange(newValues)
  }

  return (
    <Form
      form={form}
      disabled={disabled}
      layout="vertical"
      initialValues={{ title, isVertical, list }}
      onValuesChange={handleValuesChange}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="选项">
        <Form.List name="list">
          {(fields, { add, remove }) => (
            <>
              {/* 遍历所有的选项（可删除） */}
              {fields.map(({ key, name }, index) => {
                return (
                  <Space key={key} align="baseline">
                    {/* 当前选项是否选中 */}
                    <Form.Item name={[name, 'checked']} valuePropName="checked">
                      <Checkbox />
                    </Form.Item>
                    {/* 当前选项 输入框 */}
                    <Form.Item
                      name={[name, 'text']}
                      rules={[
                        { required: true, message: '请输入选项文字' },
                        {
                          validator: (_, text) => {
                            const { list = [] } = form.getFieldsValue()
                            let num = 0
                            list.forEach((opt: OptionType) => {
                              if (opt.text === text) num++
                            })
                            if (num === 1) return Promise.resolve()
                            return Promise.reject(new Error('和其他选项重复了'))
                          },
                        },
                      ]}
                    >
                      <Input placeholder="请输入选项文字..." />
                    </Form.Item>
                    {/* 当前选项删除按钮 */}
                    {index > 0 && <MinusCircleOutlined onClick={() => remove(name)} />}
                  </Space>
                )
              })}
              {/* 添加选项 */}
              <Form.Item>
                <Button
                  onClick={() => add({ text: '', value: '', checked: false })}
                  icon={<PlusOutlined />}
                  type="link"
                  block
                >
                  添加选项
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>
      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox>竖向排列</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
