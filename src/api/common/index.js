import request from '@/utils/request'
import moment from 'moment'

/**
 * OSS签名
 * @returns {AxiosPromise}
 */
export function getStsTokenAPI(params) {
  return request({
    url: '/oss/getStsToken',
    method: 'get',
    params
  })
}
/*
 * @Author: ZhangYeLei
 * @Date: 2022-04-14 16:21:46
 * @LastEditTime: 2023-03-15 10:11:42
 * @LastEditors: gaoleifang
 */


/**
  * OSS签名
  * @returns {AxiosPromise}
  */
export function getSignature(params) {
  return request({
    url: '/api_cs/oss/getSignature',
    method: 'get',
    params,
    headers: {
      isToken: false,
      Authorization: 'Bearer eyJraWQiOiJkOTY3YmVjYi1iMzRkLTQ0ZTItOTUyMy0yNmU1ZWQ5NzNkZDkiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiLlkajlrZDnkLMiLCJhdWQiOiLlkajlrZDnkLMiLCJlbnZpcm9ubWVudCI6ImRldiIsIm5iZiI6MTY3ODc4NTA4OCwic2NvcGUiOlsiQ1VTVE9NRVJfU0VSVklDRV9NT0JJTEVfUEFTU1dPUkQiXSwiaXNzIjoi5Lit5Y-w5a6i5pyNIiwiY3VycmVudF91c2VyX2lkIjoiNCIsImV4cCI6MTY3ODg3MTQ4OCwiaWF0IjoxNjc4Nzg1MDg4LCJqdGkiOiI3Mzg2MWZmZi00OTAxLTRkMDQtYTNjZC1iM2M5ZDhmMTczNzAifQ.Xh1FotMwntlbKjh-cDAcafqlo5aR2ESb9ii1hQ7pqPCSps62aw9JEMrjWIwEYksmu-tIMzIfZsI9G1tUVTXp1gUtW0IWPsNbsnkr_j19lw2hIVW38VdtDwTjg6bea5X6mk4-W3SxdTs4XMQqsndE7tRbnitHk7xihRjZYeIUZbusYv5_pc94g1tnCTYXExjN9D10WSxXatBSD1hKTtoT_E112NSAgjp9FRZT1WTvcOu0El-2UN1NpftGNaTM67tR-JToDLIk0wGzFIjSgaKthVPghD6oV93SxLd1OEdB20mtLCLnhMI2Oo5v_E4kF0Erp3AG9iUvrvPqUdgNNA7Oew'
    }
  })
}

const get_suffix = (filename) => {
  const pos = filename.lastIndexOf('.')
  let suffix = ''
  if (pos !== -1) {
    suffix = filename.substring(pos).toLocaleLowerCase()
  }
  return suffix
}

const random_string = (len) => {
  len = len || 32
  var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
  var maxPos = chars.length
  var pwd = ''
  for (let i = 0; i < len; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return pwd
}

/**
  * 上传文件
  * @returns {Promise<(AxiosPromise<any>|string)[]>}
  */
 export async function upload({
  file: file,
  rename: rename = true,
  time: time = 0,
  attr: attr = {},
  onUploadProgress = () => {}
}, cb) {
  const bucketName = 'one-by-one'
  const res = JSON.parse(localStorage.getItem('sign'))
  const timestamp = new Date().getTime() / 1000
  let data = {}
  if (res && res.expire - timestamp > 30 && res.bucketName === bucketName) {
    data = res
  } else {
    data = await getSignature({
      bucketName: bucketName
    })
    localStorage.setItem('sign', JSON.stringify({ ...data, bucketName: bucketName }))
  }
  // const dir = attr.bucketName ? attr.dir : 'operation-resource/'
  const filename = file.name
  const picName = random_string(10) + get_suffix(filename)
  const keyValue = `${data.dir}/${moment().format('YYYY-MM-DD')}/${rename ? picName : file.name}`
  const ossDat = new FormData()
  ossDat.append('key', keyValue)
  ossDat.append('policy', data.policy)
  ossDat.append('OSSAccessKeyId', data.accessid)
  ossDat.append('success_action_status', 200)
  ossDat.append('signature', data.signature)
  // ossDat.append('callback', data.callback)
  ossDat.append('file', file, file.name)
  const url = `https://imgvip.meishubao.com/${keyValue}`
  console.log(url, 'url')

  request({
    url: data.host,
    method: 'post',
    data: ossDat,
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: onUploadProgress,
    timeout: (time || 20) * 1000
  }).then(res => {
    cb && cb(url)
    // if (res.Status === 'OK') {
    //   cb && cb(`${data.urlPrefix}${keyValue}`)
    // } else {
    //   cb && cb('')
    //   this.$message.error('上传超时，请检查网络后重试')
    // }
  }).catch(err => {
    console.log(err)
    this.$message.error('获取上传文件签名失败')
    cb && cb('')
  })
}

