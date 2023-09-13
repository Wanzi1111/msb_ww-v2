import OSS from "ali-oss";
import { head, clone } from "lodash";
import { parseTime } from "@/utils/ruoyi";
import { getStsTokenAPI } from "@/api/common";

let tempCheckpoint;
function getFileSuffix(str) {
  return head(/\.[^\.]+$/.exec(str) || [".jpg"]);
}

export async function uploadFile(
  // locate,
  // _ossData,
  files,
  callback,
  progressCallback
) {
  const _ossData = await getStsTokenAPI();
  const ossData = clone(_ossData.payload||{});
  let params = {
    accessKeyId: ossData.accessKeyId,
    accessKeySecret: ossData.accessKeySecret,
    bucket: ossData.bucketName,
    region: "oss-cn-beijing",
    stsToken: ossData.securityToken,
  };
  const client = new OSS(params);
  // var reader = new FileReader(); //define a Reader
  var file = files;
  let url = "";
  const suffix = getFileSuffix(file.name);

  const ossPath = `${ossData.uploadDir}/${parseTime(
    Date.now(),
    "{y}-{m}-{d}"
  )}/${new Date().getTime()}${suffix}`;

  const mime = file.type;
  const result = client.multipartUpload(ossPath, file, {
    progress: function (p, checkpoint) {
      progressCallback && progressCallback(parseInt(p * 100));
      // checkpoint参数用于记录上传进度，断点续传上传时将记录的checkpoint参数传入即可。浏览器重启后无法直接继续上传，您需要手动触发上传操作。
      tempCheckpoint = checkpoint;
    },
    mime,
  });

  return result
    .then(() => {
      url = `${ossData.realmName}/${ossPath}`;
      // const signUrl = client.signatureUrl(ossPath);
      callback &&
        callback({
          url,
          // signUrl,
        });
    })
    .catch((e) => {
      console.log("e", e);
    });
  // reader.onload = function () {
  // };
  // reader.readAsArrayBuffer(file);
}
