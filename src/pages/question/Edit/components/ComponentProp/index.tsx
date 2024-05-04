import React, { FC } from 'react'
import useGetComponentInfo from '@/hooks/useGetComponentInfo'
import { getComponentConfByType, ComponentPropsType } from '@/components/QuestionComponents'
import { changeComponentProps } from '@/store/componentsReducer'
import { useDispatch } from 'react-redux'

const NoProp: FC = () => {
  return <div style={{ textAlign: 'center' }}>未选中组件</div>
}

const ComponentProp: FC = () => {
  const dispatch = useDispatch()
  //获取当前选中的组件
  const { selectedComponent } = useGetComponentInfo()

  if (selectedComponent == null) return <NoProp />

  //根据当前选中组件的type获取组件配置
  const { type, props } = selectedComponent
  const componentConf = getComponentConfByType(type)
  if (componentConf == null) return <NoProp />

  const { PropComponent } = componentConf

  function changeProps(newProps: ComponentPropsType) {
    if (selectedComponent == null) return
    const { fe_id } = selectedComponent
    dispatch(changeComponentProps({ fe_id, newProps }))
  }

  return <PropComponent {...props} onChange={changeProps} />
}

export default ComponentProp
