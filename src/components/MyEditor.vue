<template>
  <div>
    <div>
      <el-button @click="showPageSetting = true">页面设置</el-button>
      <el-button type="primary" @click="printPreview">打印预览</el-button>
      <el-button type="success" @click="print">打印</el-button>
      <el-radio-group
        :disabled="!previewHtml"
        v-model="mode"
        style="margin-left: 10px; margin-right: 10px"
      >
        <el-radio-button label="normal">正常</el-radio-button>
        <el-radio-button label="continue">续打</el-radio-button>
        <el-radio-button label="rectangle">区域打印</el-radio-button>
      </el-radio-group>
      <el-button
        type="primary"
        :disabled="!previewHtml"
        @click="
          previewHtml = null;
          mode = 'normal';
        "
        >清空预览</el-button
      >
    </div>
    <div style="border: 1px solid #ccc; margin-top: 10px">
      <!-- 工具栏 -->
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editor"
        :defaultConfig="toolbarConfig"
      />
      <!-- 编辑器 -->
      <Editor
        style="height: 400px; overflow-y: hidden"
        :defaultConfig="editorConfig"
        v-model="html"
        @onChange="onChange"
        @onCreated="onCreated"
      />
    </div>
    <div style="margin-top: 10px; box-sizing: border-box">
      <textarea
        v-model="html"
        readonly
        style="
          width: 100%;
          height: 200px;
          outline: none;
          box-sizing: border-box;
        "
      ></textarea>
    </div>
    <div class="preview" v-html="previewHtml"></div>
    <PageSetting
      :isOpen="showPageSetting"
      v-model="pageSetting"
      @close="showPageSetting = false"
    />
  </div>
</template>

<script>
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import PageSetting from "./PageSetting";
import printTest from "../utils/print_test";
import printPdfTest from "../utils/print_pdf_test";
import printPreview from "../utils/print_preview";

export default {
  name: "MyEditor",
  components: { Editor, Toolbar, PageSetting },
  data() {
    return {
      showPageSetting: false,
      pageSetting: {
        type: "a4",
        dir: "portrait",
        shorter: 210,
        longer: 297,
        top: 12,
        bottom: 10,
        left: 25,
        right: 10,
      },
      mode: "normal",
      previewHtml: "",
      editor: null,
      html: "<p>hello&nbsp;world</p>",
      toolbarConfig: {
        // toolbarKeys: [ /* 显示哪些菜单，如何排序、分组 */ ],
        // excludeKeys: [ /* 隐藏哪些菜单 */ ],
      },
      editorConfig: {
        placeholder: "请输入内容...",
        // autoFocus: false,

        // 所有的菜单配置，都要在 MENU_CONF 属性下
        MENU_CONF: {},
      },
    };
  },
  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor); // 【注意】一定要用 Object.seal() 否则会报错
    },
    onChange(editor) {
      console.log("onChange", editor.getHtml()); // onChange 时获取编辑器最新内容
    },
    getEditorText() {
      const editor = this.editor;
      if (editor == null) return;

      console.log(editor.getText()); // 执行 editor API
    },
    printEditorHtml() {
      const editor = this.editor;
      if (editor == null) return;

      console.log(editor.getHtml()); // 执行 editor API
    },
    printPdf() {
      printPdfTest(this.html);
    },
    printPreview() {
      this.mode = "normal";
      this.previewHtml = printPreview(this.html, this.pageSetting);
    },
    print() {
      if (!this.previewHtml) {
        this.mode = "normal";
        this.previewHtml = printPreview(this.html, this.pageSetting);
      }
      printTest(this.previewHtml, this.pageSetting);
    },
  },
  mounted() {
    // 模拟 ajax 请求，异步渲染编辑器
    setTimeout(() => {
      this.html = `<p>Ajax&nbsp;异步设置内容&nbsp;HTML</p><p><span style="color: rgb(51, 51, 51); background-color: rgb(255, 255, 255); font-size: 16px; font-family: &quot;PingFang SC&quot;, Avenir, Tahoma, Arial, &quot;Lantinghei SC&quot;, &quot;Microsoft Yahei&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft Sans Serif&quot;, &quot;WenQuanYi Micro Hei&quot;, Helvetica, sans-serif;">城关与城关之间是一个国家，当网络包知道了下一步去哪个城关，还是要使用国家内部的&nbsp;MAC&nbsp;地址，通过下一个城关的&nbsp;MAC&nbsp;地址，找到下一个城关，然后再问下一步的路怎么走，一直到走出最后一个城关。最后一个城关知道这个网络包要去的地方。于是，对着这个国家吼一声，谁是目标&nbsp;IP&nbsp;啊？目标服务器就会回复一个&nbsp;MAC&nbsp;地址。网络包过关后，通过这个&nbsp;MAC&nbsp;地址就能找到目标服务器。目标服务器发现&nbsp;MAC&nbsp;地址对上了，取下&nbsp;MAC&nbsp;头来，发送给操作系统的网络层。发现&nbsp;IP&nbsp;也对上了，就取下&nbsp;IP&nbsp;头。IP&nbsp;头里会写上一层封装的是&nbsp;TCP&nbsp;协议，然后将其交给传输层，即&nbsp;TCP&nbsp;层。在这一层里，对于收到的每个包，都会有一个回复的包说明收到了。这个回复的包绝非这次下单请求的结果，例如购物是否成功，扣了多少钱等，而仅仅是&nbsp;TCP&nbsp;层的一个说明，即收到之后的回复。当然这个回复，会沿着刚才来的方向走回去，报个平安。因为一旦出了国门，西行路上千难万险，如果在这个过程中，网络包走丢了，例如进了大沙漠，或者被强盗抢劫杀害怎么办呢？因而到了要报个平安。如果过一段时间还是没到，发送端的&nbsp;TCP&nbsp;层会重新发送这个包，还是上面的过程，直到有一天收到平安到达的回复。这个重试绝非你的浏览器重新将下单这个动作重新请求一次。对于浏览器来讲，就发送了一次下单请求，TCP&nbsp;层不断自己闷头重试。除非&nbsp;TCP&nbsp;这一层出了问题，例如连接断了，才轮到浏览器的应用层重新发送下单请求。当网络包平安到达&nbsp;TCP&nbsp;层之后，TCP&nbsp;头中有目标端口号，通过这个端口号，可以找到电商网站的进程正在监听这个端口号，假设一个&nbsp;Tomcat，将这个包发给电商网站。城关与城关之间是一个国家，当网络包知道了下一步去哪个城关，还是要使用国家内部的&nbsp;MAC&nbsp;地址，通过下一个城关的&nbsp;MAC&nbsp;地址，找到下一个城关，然后再问下一步的路怎么走，一直到走出最后一个城关。最后一个城关知道这个网络包要去的地方。于是，对着这个国家吼一声，谁是目标&nbsp;IP&nbsp;啊？目标服务器就会回复一个&nbsp;MAC&nbsp;地址。网络包过关后，通过这个&nbsp;MAC&nbsp;地址就能找到目标服务器。目标服务器发现&nbsp;MAC&nbsp;地址对上了，取下&nbsp;MAC&nbsp;头来，发送给操作系统的网络层。发现&nbsp;IP&nbsp;也对上了，就取下&nbsp;IP&nbsp;头。IP&nbsp;头里会写上一层封装的是&nbsp;TCP&nbsp;协议，然后将其交给传输层，即&nbsp;TCP&nbsp;层。在这一层里，对于收到的每个包，都会有一个回复的包说明收到了。这个回复的包绝非这次下单请求的结果，例如购物是否成功，扣了多少钱等，而仅仅是&nbsp;TCP&nbsp;层的一个说明，即收到之后的回复。当然这个回复，会沿着刚才来的方向走回去，报个平安。因为一旦出了国门，西行路上千难万险，如果在这个过程中，网络包走丢了，例如进了大沙漠，或者被强盗抢劫杀害怎么办呢？因而到了要报个平安。如果过一段时间还是没到，发送端的&nbsp;TCP&nbsp;层会重新发送这个包，还是上面的过程，直到有一天收到平安到达的回复。这个重试绝非你的浏览器重新将下单这个动作重新请求一次。对于浏览器来讲，就发送了一次下单请求，TCP&nbsp;层不断自己闷头重试。除非&nbsp;TCP&nbsp;这一层出了问题，例如连接断了，才轮到浏览器的应用层重新发送下单请求。当网络包平安到达&nbsp;TCP&nbsp;层之后，TCP&nbsp;头中有目标端口号，通过这个端口号，可以找到电商网站的进程正在监听这个端口号，假设一个&nbsp;Tomcat，将这个包发给电商网站。城关与城关之间是一个国家，当网络包知道了下一步去哪个城关，还是要使用国家内部的&nbsp;MAC&nbsp;地址，通过下一个城关的&nbsp;MAC&nbsp;地址，找到下一个城关，然后再问下一步的路怎么走，一直到走出最后一个城关。最后一个城关知道这个网络包要去的地方。于是，对着这个国家吼一声，谁是目标&nbsp;IP&nbsp;啊？目标服务器就会回复一个&nbsp;MAC&nbsp;地址。网络包过关后，通过这个&nbsp;MAC&nbsp;地址就能找到目标服务器。目标服务器发现&nbsp;MAC&nbsp;地址对上了，取下&nbsp;MAC&nbsp;头来，发送给操作系统的网络层。发现&nbsp;IP&nbsp;也对上了，就取下&nbsp;IP&nbsp;头。IP&nbsp;头里会写上一层封装的是&nbsp;TCP&nbsp;协议，然后将其交给传输层，即&nbsp;TCP&nbsp;层。在这一层里，对于收到的每个包，都会有一个回复的包说明收到了。这个回复的包绝非这次下单请求的结果，例如购物是否成功，扣了多少钱等，而仅仅是&nbsp;TCP&nbsp;层的一个说明，即收到之后的回复。当然这个回复，会沿着刚才来的方向走回去，报个平安。因为一旦出了国门，西行路上千难万险，如果在这个过程中，网络包走丢了，例如进了大沙漠，或者被强盗抢劫杀害怎么办呢？因而到了要报个平安。如果过一段时间还是没到，发送端的&nbsp;TCP&nbsp;层会重新发送这个包，还是上面的过程，直到有一天收到平安到达的回复。这个重试绝非你的浏览器重新将下单这个动作重新请求一次。对于浏览器来讲，就发送了一次下单请求，TCP&nbsp;层不断自己闷头重试。除非&nbsp;TCP&nbsp;这一层出了问题，例如连接断了，才轮到浏览器的应用层重新发送下单请求。当网络包平安到达&nbsp;TCP&nbsp;层之后，TCP&nbsp;头中有目标端口号，通过这个端口号，可以找到电商网站的进程正在监听这个端口号，假设一个&nbsp;Tomcat，将这个包发给电商网站。</span></p><p><span style="color: rgb(51, 51, 51); background-color: rgb(255, 255, 255); font-size: 16px; font-family: &quot;PingFang SC&quot;, Avenir, Tahoma, Arial, &quot;Lantinghei SC&quot;, &quot;Microsoft Yahei&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft Sans Serif&quot;, &quot;WenQuanYi Micro Hei&quot;, Helvetica, sans-serif;">asdf</span></p>`;
    }, 1500);
  },
  beforeDestroy() {
    const editor = this.editor;
    if (editor == null) return;
    editor.destroy(); // 组件销毁时，及时销毁 editor ，重要！！！
  },
};
</script>

<style src="@wangeditor/editor/dist/css/style.css"></style>

<style src="../styles/preview.css"></style>

<style>
.preview {
  margin-top: 10px;
  height: 400px;
  background-color: #9999e9;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
}

.preview > .page {
  margin: 10px auto;
  border: solid 1px black;
  border-radius: 5px;
}
</style>
