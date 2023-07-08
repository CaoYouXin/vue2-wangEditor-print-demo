<template>
  <div class="page-setting-modal" v-if="isOpen">
    <div class="modal-header">
      <h3>页面设置</h3>
      <span style="font-size: 30px; cursor: pointer" @click="$emit('close')"
        >&times;</span
      >
    </div>
    <div>
      <div class="form-row">
        <div class="form-title">页面方向</div>
        <el-radio-group v-model="changedPageSetting.dir">
          <el-radio-button label="landscape">横向</el-radio-button>
          <el-radio-button label="portrait">纵向</el-radio-button>
        </el-radio-group>
      </div>
      <div class="form-row">
        <div class="form-title">页面大小</div>
        <el-select
          v-model="changedPageSetting.type"
          @change="changeType($event)"
        >
          <el-option disabled value="">请选择</el-option>
          <el-option value="a4">a4</el-option>
          <el-option value="a5">a5</el-option>
        </el-select>
      </div>
      <div class="form-row">
        <div class="form-title">页面尺寸</div>
        <div class="form-grid">
          <div>
            <span>短</span>
            <el-input-number
              v-model="changedPageSetting.shorter"
              controls-position="right"
              size="small"
              :step="0.1"
              :min="0"
            ></el-input-number>
            <span>mm</span>
          </div>
          <div>
            <span>长</span>
            <el-input-number
              v-model="changedPageSetting.longer"
              controls-position="right"
              size="small"
              :step="0.1"
              :min="0"
            ></el-input-number>
            <span>mm</span>
          </div>
        </div>
      </div>
      <div class="form-row">
        <div class="form-title">页边距</div>
        <div class="form-grid">
          <div>
            <span>上</span>
            <el-input-number
              v-model="changedPageSetting.top"
              controls-position="right"
              size="small"
              :step="0.1"
              :min="0"
            ></el-input-number>
            <span>mm</span>
          </div>
          <div>
            <span>下</span>
            <el-input-number
              v-model="changedPageSetting.bottom"
              controls-position="right"
              size="small"
              :step="0.1"
              :min="0"
            ></el-input-number>
            <span>mm</span>
          </div>
          <div>
            <span>左</span>
            <el-input-number
              v-model="changedPageSetting.left"
              controls-position="right"
              size="small"
              :step="0.1"
              :min="0"
            ></el-input-number>
            <span>mm</span>
          </div>
          <div>
            <span>右</span>
            <el-input-number
              v-model="changedPageSetting.right"
              controls-position="right"
              size="small"
              :step="0.1"
              :min="0"
            ></el-input-number>
            <span>mm</span>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <el-button style="margin-left: 10px" type="primary" @click="save"
        >保存</el-button
      >
      <el-button @click="$emit('close')">取消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageSetting",
  model: {
    prop: "pageSetting",
    event: "change",
  },
  props: {
    isOpen: Boolean,
    pageSetting: Object,
  },
  data() {
    return {
      changedPageSetting: {},
    };
  },
  watch: {
    isOpen(val) {
      if (val) {
        this.changedPageSetting = this.pageSetting;
      }
    },
  },
  methods: {
    save() {
      const finalPageSetting = {
        ...this.pageSetting,
        ...this.changedPageSetting,
      };
      console.log(JSON.stringify(finalPageSetting));
      this.$emit("change", finalPageSetting);
      this.$emit("close");
    },
    changeType(val) {
      switch (val) {
        case "a4":
          this.changedPageSetting.shorter = 210;
          this.changedPageSetting.longer = 297;
          break;
        case "a5":
          this.changedPageSetting.shorter = 148;
          this.changedPageSetting.longer = 210;
          break;
        default:
          throw new Error("没这个值啊!");
      }
    },
  },
};
</script>

<style scoped>
.page-setting-modal {
  width: 600px;
  top: 20vh;
  left: calc((100vw - 500px) / 2);
  position: absolute;
  border-radius: 5px;
  box-shadow: 0 0 5px black;
  background-color: white;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
}

.modal-footer {
  display: flex;
  flex-direction: row-reverse;
  padding: 10px;
}

.form-row {
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 10px;
}

.form-title {
  width: 150px;
}

.form-grid {
  display: flex;
  flex-wrap: wrap;
  width: 430px;
}

.form-grid > div {
  width: 215px;
  display: flex;
  align-items: center;
}

.form-grid > div > span {
  margin: 10px 5px;
}
</style>