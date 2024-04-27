import React, { FC } from 'react'
import { useNavigate, Link } from 'react-router-dom'
const Home: FC = () => {
  const navigate = useNavigate()
  function clickHandler() {
    // navigate('/login')
    navigate({
      pathname: '/login',
      search: 'b=20',
    })
  }
  return (
    <>
      <p>Home</p>
      <button onClick={clickHandler}>登录</button>
      <Link to="/register?a=10">注册</Link>
    </>
  )
}

export default Home
