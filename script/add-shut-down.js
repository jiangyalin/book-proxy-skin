const axios = require('axios')
const ShutDown = new require('./../models/shut-down')

// 添加关注数据
const add = async () => {
  const res = await axios({
    url: 'https://cloud.uc.cn/api/bookmark/listdata',
    method: 'post',
    params: {},
    data: {
      cur_page: 4,
      dir_guid: '239a9c0de0aa51bb113935df2f144797',
      type: 'phone'
    },
    timeout: 1000 * 60,
    headers: {
      cookie: 'csrfToken=cnfw5gIfjCYEHUxTFsZEGuOw; _UP_28A_52_=54; _UP_A4A_11_=wb838158f1be4202a5d44d2059f927d1; _UP_D_=pc; _UP_F7E_8D_=Xs2WNaujBR3G74j94yZYZEPwKLOVbxJPcg0RzQPI6Knpe%2FVlExDLvwWk3%2BqxkwVyhdZ%2Bc09AyraclvYdENl26pP6NZpJjHSFAga2josF9WI5KqmBMZjstSyxXmZd2p0oVFkfbqd%2FhVjlt0AbNkJqehFHs%2BQ%2FpshPrgvAKVxvsq4i6PDzvwNnqu7rSXFm5RjbW1%2FmvBLvMwKTOk2wEvbokFCfwAd1vIZU8iJf7UyW3fqsE%2BlICX7X3bnSe%2BfKM3Zv2UZosU2CPO%2B1Iq86JO9nn4fJkKBcqosMArg7ZF9iVjWnQHm4qkYcvouHWbThgYIZr8W58Q%2B8dF%2F5NYnDCuCRKgZGr%2FUOk3sLe1kCgrk%2By8w80vdxOCQMN6P6GbeZVhMFSjr6E2PYGvGzVjEvMmznaYgK6I8jY9WVzigJOC%2BMHN%2BzVjEvMmznadaaAJ0v0MhfwgMSen7NP2XpAVr%2B6ep%2F6k2S0X%2ByREoIk8Y3Gr241lY%3D; st=uc@14146DC9CEAD17314E76DBCA45347817; st.sig=EBfZN87AhWar0QdC_fpYOlH2OTPKqKhtXnxLrTJ6B6I; token=0f6658322833bca15eb7ad4c3a38ef53; token.sig=7JZ56nIXk22FIwU4GvJv1b7omIHkJOW0Siv4JpExKTI; nick_name=%E4%B8%83%E7%BD%AA%E9%AD%94%E9%AD%82; uid=undefined',
      origin: 'https://cloud.uc.cn',
      'x-csrf-token': 'cnfw5gIfjCYEHUxTFsZEGuOw'
    }
  })
  const list = res.data.data.list
  for (let i = 0; i < list.length; i++) {
    const item = list[i]
    let name = item.name
    if (item.name.includes(' ')) {
      const arr = item.name.split(' ')
      if (arr.length > 1) {
        name = arr[0].trim()
      }
    }
    const shutDown = {
      name,
      type: item.name.includes('漢') ? '组' : '作者',
      alias: '',
      rating: item.name.includes('👌🏻') ? 5 : 1,
      remark: item.name.substring(name.length).replace(/👌🏻/g, '').trim()
    }
    const data = await ShutDown.create(shutDown)
  }
  // const a = ' a   b   c  '
  // console.log('trim()', a.split(' ').map(item => item.trim()).join(''))
  // console.log('aaa', list)
  // const shutDown = {
  //   name: 'z',
  //   type: 'z',
  //   alias: 'z'
  // }
  // const data = await ShutDown.create(shutDown)
  // console.log('data', data._doc)
}

add()

// axios({
//   url: 'https://cloud.uc.cn/api/bookmark/listdata',
//   method: 'post',
//   params: {},
//   data: {
//     cur_page: 1,
//     dir_guid: '239a9c0de0aa51bb113935df2f144797',
//     type: 'phone'
//   },
//   timeout: 1000 * 60,
//   headers: {
//     cookie: 'csrfToken=cnfw5gIfjCYEHUxTFsZEGuOw; _UP_28A_52_=54; _UP_A4A_11_=wb838158f1be4202a5d44d2059f927d1; _UP_D_=pc; _UP_F7E_8D_=Xs2WNaujBR3G74j94yZYZEPwKLOVbxJPcg0RzQPI6Knpe%2FVlExDLvwWk3%2BqxkwVyhdZ%2Bc09AyraclvYdENl26pP6NZpJjHSFAga2josF9WI5KqmBMZjstSyxXmZd2p0oVFkfbqd%2FhVjlt0AbNkJqehFHs%2BQ%2FpshPrgvAKVxvsq4i6PDzvwNnqu7rSXFm5RjbW1%2FmvBLvMwKTOk2wEvbokFCfwAd1vIZU8iJf7UyW3fqsE%2BlICX7X3bnSe%2BfKM3Zv2UZosU2CPO%2B1Iq86JO9nn4fJkKBcqosMArg7ZF9iVjWnQHm4qkYcvouHWbThgYIZr8W58Q%2B8dF%2F5NYnDCuCRKgZGr%2FUOk3sLe1kCgrk%2By8w80vdxOCQMN6P6GbeZVhMFSjr6E2PYGvGzVjEvMmznaYgK6I8jY9WVzigJOC%2BMHN%2BzVjEvMmznadaaAJ0v0MhfwgMSen7NP2XpAVr%2B6ep%2F6k2S0X%2ByREoIk8Y3Gr241lY%3D; st=uc@14146DC9CEAD17314E76DBCA45347817; st.sig=EBfZN87AhWar0QdC_fpYOlH2OTPKqKhtXnxLrTJ6B6I; token=0f6658322833bca15eb7ad4c3a38ef53; token.sig=7JZ56nIXk22FIwU4GvJv1b7omIHkJOW0Siv4JpExKTI; nick_name=%E4%B8%83%E7%BD%AA%E9%AD%94%E9%AD%82; uid=undefined',
//     origin: 'https://cloud.uc.cn',
//     'x-csrf-token': 'cnfw5gIfjCYEHUxTFsZEGuOw'
//   }
// }).then(res => {
//   res.data.data.list.forEach(item => {
//     console.log('aa', item.name.includes('ok'))
//   })
// })
