<template>
  <div class="m-upload">
    <div v-for="(item, index) of image" :key="index" class="flex-img_pic">
      <el-image class="image" :src="item" fit="contain" />
      <i
        v-if="showDel && !disabled"
        class="el-icon-error"
        @click="handleRemove(index)"
      />
    </div>
    <el-upload
      v-show="!disabled"
      :class="['el-upload-box', { 'el-upload-limit': image.length >= limit }]"
      :action="action"
      :accept="accept"
      :show-file-list="false"
      list-type="picture"
      :name="name"
      with-credentials
      :disabled="image.length === limit || disabled"
      :headers="headers"
      :on-success="handleSuccess"
      :on-error="uploadError"
      :before-upload="beforeValidate"
    >
      <i v-show="image.length < limit" slot="trigger" class="el-icon-plus" />
      <!-- <div v-if="tips" slot="tip" class="el-upload__tip">
        {{ tips }}
      </div> -->
    </el-upload>
    <div v-if="tips" class="el-upload__tip">
      {{ tips }}
    </div>
    <el-image v-show="!image.length && disabled" class="no-image" src="" fit="contain" />
  </div>
</template>

<script>
// import { getTokenByKey } from "@/utils/token";
const { VUE_APP_DOMAIN_BASE } = process.env
export default {
  props: {
    value: {
      type:String,
      default: ""
    },
    imageList: {
      type: Array,
      default() {
        return [];
      },
    },
    tips: {
      type:String,
      default: ""
    },
    accept: {
      type: String,
      default: ".jpg, .png, .jpeg, .gif",
    },
    name: {
      type: String,
      default: "file",
    },
    showDel: {
      type: Boolean,
      default: true,
    },
    sizeLimit: {
      type: Number,
      default: 10,
    },
    limit: {
      type: Number,
      default: 1,
    },
    // 请求头
    headers: {
      type: Object,
      default() {
        return {
          // token: getTokenByKey("user", "token"),
        };
      },
    },
    action: {
      type: String,
      default: `${VUE_APP_DOMAIN_BASE}/robot-file/uploadFile`,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    whConstraint: {
      type: String,
      default: "",
    },
    beforeUpload: {
      type: Function,
      default: (file) => {
        return true;
      },
    },
  },

  data() {
    return {
      fileList:
        this.limit === 1 ? (this.value ? [this.value] : []) : this.imageList,
      VUE_APP_DOMAIN_BASE,
    };
  },
  computed: {
    image() {
      return this.limit === 1
        ? this.value
          ? [this.value]
          : []
        : this.imageList;
    },
  },
  watch: {
    image(value) {
      this.fileList = value;
    },
    fileList(value) {
      if (this.limit > 1) {
        this.$emit("update:imageList", value);
      } else {
        this.$emit("input", value && value[0]);
      }
    },
  },
  methods: {
    handleRemove(index) {
      this.fileList.splice(index, 1);
    },
    handleSuccess(res, file, fileList) {
      const {data} = res
      const { code, msg } = res.status;
      if (code === 1 && data) {
        this.fileList.push(data);
      } else {
        return this.$message.error(msg);
      }
    },
    // 上传失败
    uploadError() {
      this.$message.error("文件上传失败");
    },
    beforeValidate(file) {
      const { whConstraint, beforeUpload } = this;
      const isLtSize = file.size / 1024 <= this.sizeLimit * 1024;
      if (!isLtSize) {
        this.$message.error(`上传图片大小不能超过 ${this.sizeLimit}M!`);
        return isLtSize;
      }

      /**
       * 限制宽高
       * whConstraint = w:h (宽高比)  | w*h （宽高）
       * w 'w' 限宽 | 'h' 限高
       */
      if (whConstraint) {
        return new Promise((resolve, reject) => {
          let image = new Image();
          image.src = URL.createObjectURL(file);
          image.onload = (e) => {
            const { width, height } = e.target;
            console.log(
              "图片宽度：" + image.width + " px",
              "图片高度：" + image.height + " px"
            );
            if (whConstraint.includes("*")) {
              const [w, h] = whConstraint.split("*");
              if (width === +w && height === +h) {
                resolve(file);
              } else {
                this.$message.error(`限制图片宽高${w}*${h}px!`);
              }
            } else {
              const [w, h] = whConstraint.split(":");
              if (w === "h") {
                if (height === +h) {
                  resolve(file);
                } else {
                  this.$message.error(`限制图片高度${h}px!`);
                }
              } else if (w === "w") {
                if (width === +w) {
                  resolve(file);
                } else {
                  this.$message.error(`限制图片宽度${h}px!`);
                }
              } else {
                if (width / height === w / h) {
                  resolve(file);
                } else {
                  this.$message.error(`限制图片宽高比${w}:${h}!`);
                }
              }
            }
            // eslint-disable-next-line prefer-promise-reject-errors
            reject();
            image = null;
          };
        });
      }

      return beforeUpload(file);
    },
  },
};
</script>
<style lang="scss" scoped>
.m-upload {
  display: inline-flex;
  // align-items: flex-end;
  // flex-direction: column;
  flex-wrap: wrap;
  .flex-img_pic,
  ::v-deep .el-upload {
    position: relative;
    width: 100px;
    height: 100px;
    border: 1px dashed #D9D9D9;
    
    background: #FAFAFA;
    border-radius: 2px;
    margin-right: 10px;
    margin-bottom: 10px;
    .el-image {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
  .no-image{
    width: px2rem(160);
    height: px2rem(160);
    border-radius: 4px;
  }
  .el-upload-box {
    display: inline-flex;
    // align-items: flex-end;
    flex-direction: column;
  }
  ::v-deep .el-upload {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .el-upload-limit {
    ::v-deep .el-upload {
      display: none;
    }
  }
  .el-icon-plus {
    font-size:24px;
    color: rgba(0, 0, 0, 0.65);
  }
  .el-upload {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .el-icon-error {
    position: absolute;
    z-index: 1024;
    top: -1rem;
    right: -1rem;
    font-size: 2rem;
    // @include font_color("colorPrimary")
  }
  .el-upload__tip {
    width: 100%;
    white-space: pre-line;
    color: rgba(0, 0, 0, 0.45);
  }
}
</style>
