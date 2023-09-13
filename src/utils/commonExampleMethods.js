
import { listNonSystemcodeAPI } from "@/api/group/annualInformation";

// select 输入搜索 单位
export function remoteMethod(query, dom) {
  console.log('this', this);
  if (query !== "") {
    listNonSystemcodeAPI({ unitName: query }).then((res) => {
      const data = (res.rows || []).map((i) => ({
        label: i.unitName,
        value: { label: i.unitName, value: i.id },
      }));
      setForm.call(this, "options", "companyId", data, dom);
    });
  } else {
    setForm.call(this, "options", "companyId", [], dom);
  }
}

// set form
export function setForm(type, key, data = [], dom) {
  this?.$refs[dom] &&
    this?.$refs[dom].set({
      type,
      data: { [key]: data },
    });
}