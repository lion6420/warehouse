<template>
  <div v-if="!fileUploaded" :class="[$style.uploadArea, dragging ? $style.uploadArea_over : '']" 
    @dragestart="dragging = true" @dragover="dragoverHandler" @dragenter="dragging = true" @dragleave="dragging = false" @click="triggerFileInput" @drop="onChange">
    <div :class="$style.uploadArea_info" @dragestart="dragging = true" @dragenter="dragging = true">
      <!-- font-awesome upload icon -->
      <span class="fas fa-cloud-upload-alt" :class="$style.uploadArea_title" style="position:relative;right:5px"></span>
      <span :class="$style.uploadArea_title">拖曳或點擊上傳</span>
      <div :class="$style.uploadArea_upload_limit_info">
        <div>支援格式: csv / xlsx</div>
        <div>檔案大小限制: 5 MB</div>
      </div>
    </div>
    <input type="file" @change="onChange" id="inputFile" style="display:none">
  </div>
  <div v-else :class="$style.uploadArea">
    <div :class="$style.uploadArea_descript">
      <!-- font-awesome upload icon -->
      <span>檔名: {{fileUploaded.name}}</span>
      <div>
        <span>大小: {{fileUploaded.size/1000}} KB</span>
      </div>
      <a-button style="margin-right:10px" type="primary" @click="fileUpload()">上傳檔案</a-button>
      <a-button type="danger" @click="removeFileUploaded()">清除檔案</a-button>
    </div>
  </div>
</template>

<script>
import XLSX from 'xlsx'

export default {
  data() {
    return {
      //drag
      dragging: false,
      fileUploaded: null,
    }
  },
  methods: {
    //trigger file input
    triggerFileInput() {
      document.getElementById('inputFile').click()
    },
    //upload area changed
    dragoverHandler(e) {
      e.preventDefault()
    },
    onChange(e) {
      e.preventDefault()
      var self = this
      var reader = new FileReader()
      var file = e.target.files || e.dataTransfer.files
      this.fileUploaded = file[0]
      reader.onload = function(event) {
        var wb = XLSX.read(event.target.result, {type: 'binary'})
        self.tableData_upload = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
      }
      reader.readAsBinaryString(this.fileUploaded)
      this.dragging = false
    },

    //待上傳檔案操作
    removeFileUploaded() {
      this.fileUploaded = null
    },
    fileUpload() {
      console.log('test')
    },
  }
}
</script>

<style lang="scss" module>
@import '@/styles/general.scss';

.uploadArea {
  display: flex;
  flex-direction: column;
  justify-content: center;
  @include block(100%, $height:300px);
  border: 2px dashed rgb(177, 177, 177);
  margin-top:10px;
  cursor:pointer;
  .uploadArea_info {
    @include block(20%);
    margin:auto;
    .uploadArea_title {
      font-size:30px;
    }
    .uploadArea_upload_limit_info {
      font-size:18px;
      font-family: Microsoft JhengHei;
    }
  }
  .uploadArea_descript {
    font-size:24px;
    font-family: Microsoft JhengHei;
  }
}
.uploadArea:hover {
  border: 2px solid #2e94c4;
  .uploadArea_title {
    font-size:30px;
    color: #2e94c4;
  }
}
.uploadArea_over {
  background: #5C5C5C;
  opacity: 0.8;
  border: 2px solid #2e94c4;
}
.uploadDescript {
  @include block(100%, $height:300px);
  @include border();
}
@media screen and (max-width: 850px) {
  .uploadArea {
    display: flex;
    flex-direction: column;
    justify-content: center;
    @include block(100%, $height:200px);
    border: 2px dashed rgb(177, 177, 177);
    margin-top:10px;
    cursor:pointer;
    .uploadArea_info {
      @include block(50%);
      margin:auto;
      .uploadArea_title {
        font-size:20px;
      }
      .uploadArea_upload_limit_info {
        font-size:18px;
        font-family: Microsoft JhengHei;
      }
    }
    .uploadArea_descript {
      font-size:24px;
      font-family: Microsoft JhengHei;
    }
  }
}
</style>