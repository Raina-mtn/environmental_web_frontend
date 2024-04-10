<template>
  <div class="m-upload">
    <el-upload
      v-show="!disabled"
      :class="['el-upload-box', { 'el-upload-limit': image.length >= limit }]"
      :action="action"
      :accept="accept"
      list-type="text"
      :name="name"
      with-credentials
      :headers="headers"
      multiple
      :on-success="handleSuccess"
      :on-error="uploadError"
      :before-upload="beforeValidate"
      :show-file-list="true"
    >
      <div style="text-align: left;">
        <el-button v-show="image.length < limit" slot="trigger" type="primary">
          点击上传文件
        </el-button>
        <div v-if="tips" slot="tip" class="el-upload__tip">
          {{ tips }}
        </div>
      </div>
    </el-upload>
    <div />
    <div v-show="!image.length && disabled">
      <i class="el-icon-document">暂无文件</i>
    </div>
  </div>
</template>

<script>
const { VUE_APP_DOMAIN_BASE} = process.env
export default {
  props: {
    value: {
      type:Array,
      default: ()=>[]
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
      default: "files",
    },
    showDel: {
      type: Boolean,
      default: true,
    },
    sizeLimit: {
      type: Number,
      default: Infinity,
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
      // default: `${VUE_APP_DOMAIN_BASE}/file/uploadAttachments`,
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
      fileList:this.imageList,
      progressPercent: 0,
      progressFlag: false,
      VUE_APP_DOMAIN_BASE,
    };
  },
  computed: {
    image() {
      return this.imageList;
    }
  },
  watch: {
    image(value) {
      this.fileList = value;
      console.log(this.image);
    },
    fileList(value) {
      if (this.limit > 1) {
        this.$emit("update:imageList", value);
      } else {
        this.$emit("input", value);
      }
    },
    progressPercent(value){
      console.log(value);
    }
  },
  methods: {
    handleRemove(index) {
      this.fileList.splice(index, 1);
    },
    handleSuccess(res, file, fileList) {
      this.progressFlag = false
      this.progressPercent = 100
      const {data} = res
      const { code, msg } = res.status;
      if (code === 1 && data) {
        setTimeout(()=>{
          this.fileList.push(data[0]);
        },400)
      } else {
        return this.$message.error(msg);
      }
    },
    // 上传失败
    uploadError() {
      this.progressFlag = false
      this.$message.error("文件上传失败");
    },
    beforeValidate(file) {
      console.log('打印数据:', file)
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

      this.progressFlag = true
      this.progressPercent = 10
      return beforeUpload(file);
    },
  },
};
</script>
<style lang="scss" scoped>
.m-upload {
  display: inline-flex;
  align-items: flex-end;
  a{
    color: #fff;
  }
  .flex-img_pic,
  .el-upload-image ::v-deep.el-upload {
    position: relative;
    width: px2rem(208);
    height: px2rem(208);
    border: 1px dashed #3BA1FF;
    background: #01498F;
    border-radius: 8px;
    margin-right: 10px;
    .el-image , .image{
      width: 100%;
      height: 100%;
      display: block;
    }
  }
  .no-image{
    width: 120px;
    border-radius: 8px;
    color: #999;
  }
  .el-upload-box {
    display: inline-flex;
    align-items: flex-end;
    position: relative;
  }
  ::v-deep .el-upload-image .el-upload {
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
    font-size: 3rem;
    color: #ccc;
  }
  .el-upload-image ::v-deep .el-upload {
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
    
  }
  .el-upload__tip {
    white-space: pre-line;
    color: rgba(0, 0, 0, 0.45);
  }
  .progress-bar{
    position: absolute;
    width: 100px;
    left: 10px;
    top: 50%;
    left:100%;
    transform: translateY(-50%);
    ::v-deep{
      .el-progress--text-inside .el-progress-bar{
        // transition: 0.1s;
      }
    }
  }
}
</style>
