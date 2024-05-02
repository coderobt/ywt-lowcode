import Mock from 'mockjs'

Mock.mock('/api/test', 'get', () => {
  return {
    errno: 0,
    data: {
      name: `ywt ${Date.now()}`,
    },
  }
})
