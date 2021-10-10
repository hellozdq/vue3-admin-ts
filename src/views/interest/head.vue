<template>
  <div class="container">
    <div class="example">
      <div class="title">国旗渐变头像</div>
      <div class="img" ref="imgRef"></div>
      <div class="img2"><img :src="url" alt="" /></div>
    </div>
    <div class="cusHead">
      <div>自定义头像（第一张为底图、第二张为渲染图）</div>
      <el-form ref="form" label-width="100px">
        <el-form-item label="上传图片">
          <div class="uploadContent">
            <el-upload
              action=""
              list-type="picture-card"
              :auto-upload="false"
              :on-change="onChange"
              :on-remove="handleRemove"
              :file-list="fileLists"
              :limit="2"
              :class="{ uploadLimit: fileLists.length === 1 }"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-upload
              action=""
              list-type="picture-card"
              :auto-upload="false"
              :on-change="onChange2"
              :on-remove="handleRemove2"
              :file-list="fileLists2"
              :limit="2"
              :class="{ uploadLimit: fileLists2.length === 1 }"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item label="合成的头像">
          <div class="imgContent">
            <div class="cusImg"> </div>
          </div>
          <div class="downloadBtn">
            <el-button type="primary" @click="download">下载</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref } from 'vue'
  import { UploadFile } from 'element-plus/lib/el-upload/src/upload.type'
  import html2canvas from 'html2canvas'
  export default defineComponent({
    name: 'Head',
    setup(props) {
      const imgRef = ref<HTMLFormElement | null>(null)
      let fileLists = reactive<UploadFile[]>([])
      let fileLists2 = reactive<UploadFile[]>([])
      const url = ref('')

      // 删除上传图片1
      const handleRemove = (file: UploadFile, fileList: UploadFile[]) => {
        fileLists.splice(0, 1)
        if (imgRef.value) {
          imgRef.value.style.setProperty('--imgUrl', '')
        }
      }

      // 删除上传图片2
      const handleRemove2 = (file: UploadFile, fileList: UploadFile[]) => {
        fileLists2.splice(0, 1)
        if (imgRef.value) {
          imgRef.value.style.setProperty('--imgUrl2', '')
        }
      }

      // 上传图片1
      const onChange = (file: UploadFile, fileList: UploadFile[]) => {
        fileLists.push(file)
        if (imgRef.value) {
          imgRef.value.style.setProperty('--imgUrl', 'url(' + fileLists[0].url + ')')
        }
      }

      // 上传图片2
      const onChange2 = (file: UploadFile, fileList: UploadFile[]) => {
        fileLists2.push(file)
        if (imgRef.value) {
          imgRef.value.style.setProperty('--imgUrl2', 'url(' + fileLists2[0].url + ')')
        }
      }

      const download = () => {
        if (imgRef.value) {
          html2canvas(imgRef.value).then((canvas) => {
            let dataURL = canvas.toDataURL('image/png')
            url.value = dataURL
            // if (dataURL !== '') {
            //   var aLink = document.createElement('a')
            //   aLink.download = '头像'
            //   aLink.href = dataURL
            //   aLink.click()
            // }
          })
        }
      }

      return {
        handleRemove,
        onChange,
        handleRemove2,
        onChange2,
        imgRef,
        fileLists,
        fileLists2,
        download,
        url
      }
    }
  })
</script>

<style lang="scss" scoped>
  .container {
    .example {
      padding: 10px;
      border: solid 1px #999;
      .img {
        position: relative;
        width: 200px;
        height: 200px;
        background: url('@/assets/images/logo2.png');
        background-size: cover;
        border: solid 1px #ccc;
        &::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          // 国旗图片
          background: url('@/assets/images/national_flag.png') no-repeat;
          background-size: cover;
          mask: linear-gradient(110deg, #000 10%, transparent 70%, transparent);
          -webkit-mask: linear-gradient(110deg, #000 10%, transparent 70%, transparent);
        }
      }
    }
    .cusHead {
      margin-top: 20px;
      padding: 10px;
      border: solid 1px #999;
      border-radius: 3px;
      .imgContent {
        border: solid 1px #ccc;
        width: 200px;
        height: 200px;
        .cusImg {
          --imgUrl: '';
          --imgUrl2: '';
          position: relative;
          width: 200px;
          height: 200px;
          background: var(--imgUrl);
          background-size: cover;
          border-radius: 3px;
          &::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            // 图片
            background: var(--imgUrl2);
            background-image: linear-gradient(110deg, #000 10%, transparent 70%, transparent);
            background-size: cover;
            // mask 存在转成图片问题
            // mask: linear-gradient(110deg, #000 10%, transparent 70%, transparent);
            // -webkit-mask: linear-gradient(110deg, #000 10%, transparent 70%, transparent);
          }
        }
      }

      .downloadBtn {
        margin-top: 10px;
      }
      .uploadContent {
        display: flex;
        & > div:nth-of-type(1) {
          margin-right: 10px;
        }
      }
    }
  }
  ::v-deep .uploadLimit .el-upload {
    display: none;
  }
</style>
