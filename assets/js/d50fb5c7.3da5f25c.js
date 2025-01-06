"use strict";(self.webpackChunkchisel_lang=self.webpackChunkchisel_lang||[]).push([[1281],{9536:(e,n,a)=>{a.r(n),a.d(n,{assets:()=>r,contentTitle:()=>o,default:()=>c,frontMatter:()=>s,metadata:()=>l,toc:()=>u});var t=a(4848),i=a(8453);const s={layout:"docs",title:"Naming",section:"chisel3"},o="Naming",l={id:"explanations/naming",title:"Naming",description:"Historically, Chisel has had trouble reliably capturing the names of signals. The reasons for this are due to (1)",source:"@site/docs/explanations/naming.md",sourceDirName:"explanations",slug:"/explanations/naming",permalink:"/docs/explanations/naming",draft:!1,unlisted:!1,editUrl:"https://github.com/chipsalliance/chisel/tree/main/docs/src/explanations/naming.md",tags:[],version:"current",frontMatter:{layout:"docs",title:"Naming",section:"chisel3"},sidebar:"chiselSidebar",previous:{title:"Muxes and Input Selection",permalink:"/docs/explanations/muxes-and-input-selection"},next:{title:"Operators",permalink:"/docs/explanations/operators"}},r={},u=[{value:"Compiler Plugin",id:"compiler-plugin",level:3},{value:"Prefixing",id:"prefixing",level:3},{value:"Suggest a Signal&#39;s Name (or the instance name of a Module)",id:"suggest-a-signals-name-or-the-instance-name-of-a-module",level:3},{value:"Behavior for &quot;Unnamed signals&quot; (aka &quot;Temporaries&quot;)",id:"behavior-for-unnamed-signals-aka-temporaries",level:3},{value:"Set a Module Name",id:"set-a-module-name",level:3}];function d(e){const n={a:"a",code:"code",em:"em",h1:"h1",h3:"h3",header:"header",p:"p",pre:"pre",strong:"strong",...(0,i.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"naming",children:"Naming"})}),"\n",(0,t.jsxs)(n.p,{children:["Historically, Chisel has had trouble reliably capturing the names of signals. The reasons for this are due to (1)\nprimarily relying on reflection to find names, (2) using ",(0,t.jsx)(n.code,{children:"@chiselName"})," macro which had unreliable behavior."]}),"\n",(0,t.jsx)(n.p,{children:"Chisel 3.4 introduced a custom Scala compiler plugin which enables reliabe and automatic capturing of signal names, when\nthey are declared. In addition, this release includes prolific use of a new prefixing API which enables more stable\nnaming of signals programmatically generated from function calls."}),"\n",(0,t.jsxs)(n.p,{children:["This document explains how naming now works in Chisel for signal and module names. For cookbook examples on how to fix\nsystemic name-stability issues, please refer to the naming ",(0,t.jsx)(n.a,{href:"../cookbooks/naming",children:"cookbook"}),"."]}),"\n",(0,t.jsx)(n.h3,{id:"compiler-plugin",children:"Compiler Plugin"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-scala",children:"// Imports used by the following examples\nimport chisel3._\nimport chisel3.experimental.{prefix, noPrefix}\n"})}),"\n",(0,t.jsx)(n.p,{children:"Chisel users must also include the compiler plugin in their build settings.\nIn SBT this is something like:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-scala",children:'// For chisel versions 5.0.0+\naddCompilerPlugin("org.chipsalliance" % "chisel-plugin" % "5.0.0" cross CrossVersion.full)\n// For older chisel3 versions, eg. 3.6.0\naddCompilerPlugin("edu.berkeley.cs" % "chisel3-plugin" % "3.6.0" cross CrossVersion.full)\n'})}),"\n",(0,t.jsxs)(n.p,{children:["This plugin will run after the 'typer' phase of the Scala compiler. It looks for any user code which is of the form\n",(0,t.jsx)(n.code,{children:"val x = y"}),", where ",(0,t.jsx)(n.code,{children:"x"})," is of type ",(0,t.jsx)(n.code,{children:"chisel3.Data"}),", ",(0,t.jsx)(n.code,{children:"chisel3.MemBase"}),", or ",(0,t.jsx)(n.code,{children:"chisel3.experimental.BaseModule"}),". For each\nline which fits this criteria, it rewrites that line. In the following examples, the commented line is the what the\nline above is rewritten to."]}),"\n",(0,t.jsxs)(n.p,{children:["If the line is within a bundle declaration or is a module instantiation, it is rewritten to replace the right hand\nside with a call to ",(0,t.jsx)(n.code,{children:"autoNameRecursively"}),", which names the signal/module."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-scala",children:'class MyBundle extends Bundle {\n  val foo = Input(UInt(3.W))\n  // val foo = autoNameRecursively("foo")(Input(UInt(3.W)))\n}\nclass Example1 extends Module {\n  val io = IO(new MyBundle())\n  // val io = autoNameRecursively("io")(IO(new MyBundle()))\n}\n'})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-verilog",children:"// Generated by CIRCT firtool-1.99.2\nmodule Example1(\n  input       clock,\n              reset,\n  input [2:0] io_foo\n);\n\nendmodule\n\n"})}),"\n",(0,t.jsx)(n.p,{children:"Otherwise, it is rewritten to also include the name as a prefix to any signals generated while executing the right-hand-\nside of the val declaration:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-scala",children:'class Example2 extends Module {\n  val in = IO(Input(UInt(2.W)))\n  // val in = autoNameRecursively("in")(prefix("in")(IO(Input(UInt(2.W)))))\n\n  val out1 = IO(Output(UInt(4.W)))\n  // val out1 = autoNameRecursively("out1")(prefix("out1")(IO(Output(UInt(4.W)))))\n  val out2 = IO(Output(UInt(4.W)))\n  // val out2 = autoNameRecursively("out2")(prefix("out2")(IO(Output(UInt(4.W)))))\n  val out3 = IO(Output(UInt(4.W)))\n  // val out3 = autoNameRecursively("out3")(prefix("out3")(IO(Output(UInt(4.W)))))\n\n  def func() = {\n    val squared = in * in\n    // val squared = autoNameRecursively("squared")(prefix("squared")(in * in))\n    out1 := squared\n    val delay = RegNext(squared)\n    // val delay = autoNameRecursively("delay")(prefix("delay")(RegNext(squared)))\n    delay\n  }\n\n  val masked = 0xa.U & func()\n  // val masked = autoNameRecursively("masked")(prefix("masked")(0xa.U & func()))\n  // Note that values created inside of `func()`` are prefixed with `masked`\n\n  out2 := masked + 1.U\n  out3 := masked - 1.U\n}\n'})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-verilog",children:"// Generated by CIRCT firtool-1.99.2\nmodule Example2(\n  input        clock,\n               reset,\n  input  [1:0] in,\n  output [3:0] out1,\n               out2,\n               out3\n);\n\n  wire [3:0] _GEN = {2'h0, in};\n  wire [3:0] masked_squared = _GEN * _GEN;\n  reg  [3:0] masked_delay;\n  wire [3:0] masked = masked_delay & 4'hA;\n  always @(posedge clock)\n    masked_delay <= masked_squared;\n  assign out1 = masked_squared;\n  assign out2 = masked + 4'h1;\n  assign out3 = masked - 4'h1;\nendmodule\n\n"})}),"\n",(0,t.jsx)(n.p,{children:"Prefixing can also be derived from the name of signals on the left-hand side of a connection.\nWhile this is not implemented via the compiler plugin, the behavior should feel similar:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-scala",children:'class ConnectPrefixing extends Module {\n  val in = IO(Input(UInt(2.W)))\n  // val in = autoNameRecursively("in")(prefix("in")(IO(Input(UInt(2.W)))))\n\n  val out1 = IO(Output(UInt(4.W)))\n  // val out1 = autoNameRecursively("out1")(prefix("out1")(IO(Output(UInt(4.W)))))\n  val out2 = IO(Output(UInt(4.W)))\n  // val out2 = autoNameRecursively("out2")(prefix("out2")(IO(Output(UInt(4.W)))))\n\n  out1 := { // technically this is not wrapped in autoNameRecursively nor prefix\n    // But the Chisel runtime will still use the name of `out1` as a prefix\n    val squared = in * in\n    out2 := squared\n    val delayed = RegNext(squared)\n    // val delayed = autoNameRecursively("delayed")(prefix("delayed")(RegNext(squared)))\n    delayed + 1.U\n  }\n}\n'})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-verilog",children:"// Generated by CIRCT firtool-1.99.2\nmodule ConnectPrefixing(\n  input        clock,\n               reset,\n  input  [1:0] in,\n  output [3:0] out1,\n               out2\n);\n\n  wire [3:0] _GEN = {2'h0, in};\n  wire [3:0] out1_squared = _GEN * _GEN;\n  reg  [3:0] out1_delayed;\n  always @(posedge clock)\n    out1_delayed <= out1_squared;\n  assign out1 = out1_delayed + 4'h1;\n  assign out2 = out1_squared;\nendmodule\n\n"})}),"\n",(0,t.jsxs)(n.p,{children:["Note that the naming also works if the hardware type is nested in an ",(0,t.jsx)(n.code,{children:"Option"})," or a subtype of ",(0,t.jsx)(n.code,{children:"Iterable"}),":"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-scala",children:'class Example3 extends Module {\n  val in = IO(Input(UInt(2.W)))\n  // val in = autoNameRecursively("in")(prefix("in")(IO(Input(UInt(2.W)))))\n\n  val out = IO(Output(UInt(4.W)))\n  // val out = autoNameRecursively("out")(prefix("out")(IO(Output(UInt(4.W)))))\n\n  def func() = {\n    val delay = RegNext(in)\n    delay + 1.U\n  }\n\n  val opt = Some(func())\n  // Note that the register in func() is prefixed with `opt`:\n  // val opt = autoNameRecursively("opt")(prefix("opt")(Some(func()))\n\n  out := opt.get + 1.U\n}\n'})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-verilog",children:"// Generated by CIRCT firtool-1.99.2\nmodule Example3(\n  input        clock,\n               reset,\n  input  [1:0] in,\n  output [3:0] out\n);\n\n  reg [1:0] opt_delay;\n  always @(posedge clock)\n    opt_delay <= in;\n  assign out = {2'h0, opt_delay - 2'h2};\nendmodule\n\n"})}),"\n",(0,t.jsxs)(n.p,{children:["There is also a slight variant (",(0,t.jsx)(n.code,{children:"autoNameRecursivelyProduct"}),") for naming hardware with names provided by an unapply:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-scala",children:'class UnapplyExample extends Module {\n  def mkIO() = (IO(Input(UInt(2.W))), IO(Output(UInt(2.W))))\n  val (in, out) = mkIO()\n  // val (in, out) = autoNameRecursivelyProduct(List(Some("in"), Some("out")))(mkIO())\n\n  out := in\n}\n'})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-verilog",children:"// Generated by CIRCT firtool-1.99.2\nmodule UnapplyExample(\n  input        clock,\n               reset,\n  input  [1:0] in,\n  output [1:0] out\n);\n\n  assign out = in;\nendmodule\n\n"})}),"\n",(0,t.jsxs)(n.p,{children:["Note that the compiler plugin will not insert a prefix in these cases because it is ambiguous what the prefix should be.\nUsers who desire a prefix are encouraged to provide one as ",(0,t.jsx)(n.a,{href:"#prefixing",children:"described below"}),"."]}),"\n",(0,t.jsx)(n.h3,{id:"prefixing",children:"Prefixing"}),"\n",(0,t.jsxs)(n.p,{children:["As shown above, the compiler plugin automatically attempts to prefix some of your signals for you.\nHowever, you as a user can also add your own prefixes by calling ",(0,t.jsx)(n.code,{children:"prefix(...)"}),":"]}),"\n",(0,t.jsx)(n.p,{children:"Also note that the prefixes append to each other (including the prefix generated by the compiler plugin):"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-scala",children:'class Example6 extends Module {\n  val in = IO(Input(UInt(2.W)))\n  val out = IO(Output(UInt(4.W)))\n\n  val add = prefix("foo") {\n    val sum = RegNext(in + 1.U)\n    sum + 1.U\n  }\n\n  out := add\n}\n'})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-verilog",children:"// Generated by CIRCT firtool-1.99.2\nmodule Example6(\n  input        clock,\n               reset,\n  input  [1:0] in,\n  output [3:0] out\n);\n\n  reg [1:0] add_foo_sum;\n  always @(posedge clock)\n    add_foo_sum <= in + 2'h1;\n  assign out = {2'h0, add_foo_sum + 2'h1};\nendmodule\n\n"})}),"\n",(0,t.jsxs)(n.p,{children:["Sometimes you may want to disable the prefixing. This might occur if you are writing a library function and\ndon't want the prefixing behavior. In this case, you can call ",(0,t.jsx)(n.code,{children:"noPrefix"}),":"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-scala",children:"class Example7 extends Module {\n  val in = IO(Input(UInt(2.W)))\n  val out = IO(Output(UInt(4.W)))\n\n  val add = noPrefix {\n    val sum = RegNext(in + 1.U)\n    sum + 1.U\n  }\n\n  out := add\n}\n"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-verilog",children:"// Generated by CIRCT firtool-1.99.2\nmodule Example7(\n  input        clock,\n               reset,\n  input  [1:0] in,\n  output [3:0] out\n);\n\n  reg [1:0] sum;\n  always @(posedge clock)\n    sum <= in + 2'h1;\n  assign out = {2'h0, sum + 2'h1};\nendmodule\n\n"})}),"\n",(0,t.jsx)(n.h3,{id:"suggest-a-signals-name-or-the-instance-name-of-a-module",children:"Suggest a Signal's Name (or the instance name of a Module)"}),"\n",(0,t.jsxs)(n.p,{children:["If you want to specify the name of a signal, you can always use the ",(0,t.jsx)(n.code,{children:".suggestName"})," API. Please note that the suggested\nname will still be prefixed (including by the plugin). You can always use the ",(0,t.jsx)(n.code,{children:"noPrefix"})," object to strip this."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-scala",children:'class Example8 extends Module {\n  val in = IO(Input(UInt(2.W)))\n  val out = IO(Output(UInt(4.W)))\n\n  val add = {\n    val sum = RegNext(in + 1.U).suggestName("foo")\n    sum + 1.U\n  }\n\n  out := add\n}\n'})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-verilog",children:"// Generated by CIRCT firtool-1.99.2\nmodule Example8(\n  input        clock,\n               reset,\n  input  [1:0] in,\n  output [3:0] out\n);\n\n  reg [1:0] add_foo;\n  always @(posedge clock)\n    add_foo <= in + 2'h1;\n  assign out = {2'h0, add_foo + 2'h1};\nendmodule\n\n"})}),"\n",(0,t.jsxs)(n.p,{children:["Note that using ",(0,t.jsx)(n.code,{children:".suggestName"})," does ",(0,t.jsx)(n.strong,{children:"not"})," affect prefixes derived from val names;\nhowever, it ",(0,t.jsx)(n.em,{children:"can"})," affect prefixes derived from connections (eg. ",(0,t.jsx)(n.code,{children:":="}),"):"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-scala",children:'class ConnectionPrefixExample extends Module {\n  val in0 = IO(Input(UInt(2.W)))\n  val in1 = IO(Input(UInt(2.W)))\n\n  val out0 = {\n    val port = IO(Output(UInt(5.W)))\n    // Even though this suggestName is before mul, the prefix used in this scope\n    // is derived from `val out0`, so this does not affect the name of mul\n    port.suggestName("foo")\n    // out0_mul\n    val mul = RegNext(in0 * in1)\n    port := mul + 1.U\n    port\n  }\n\n  val out1 = IO(Output(UInt(4.W)))\n  val out2 = IO(Output(UInt(4.W)))\n\n  out1 := {\n    // out1_sum\n    val sum = RegNext(in0 + in1)\n    sum + 1.U\n  }\n  // Comes after so does *not* affect prefix above\n  out1.suggestName("bar")\n\n  // Comes before so *does* affect prefix below\n  out2.suggestName("fizz")\n  out2 := {\n    // fizz_diff\n    val diff = RegNext(in0 - in1)\n    diff + 1.U\n  }\n}\n'})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-verilog",children:"// Generated by CIRCT firtool-1.99.2\nmodule ConnectionPrefixExample(\n  input        clock,\n               reset,\n  input  [1:0] in0,\n               in1,\n  output [4:0] foo,\n  output [3:0] bar,\n               fizz\n);\n\n  reg [3:0] out0_mul;\n  reg [1:0] out1_sum;\n  reg [1:0] fizz_diff;\n  always @(posedge clock) begin\n    out0_mul <= {2'h0, in0} * {2'h0, in1};\n    out1_sum <= in0 + in1;\n    fizz_diff <= in0 - in1;\n  end // always @(posedge)\n  assign foo = {1'h0, out0_mul + 4'h1};\n  assign bar = {2'h0, out1_sum + 2'h1};\n  assign fizz = {2'h0, fizz_diff + 2'h1};\nendmodule\n\n"})}),"\n",(0,t.jsx)(n.p,{children:"As this example illustrates, this behavior is slightly inconsistent so is subject to change in a future version of Chisel."}),"\n",(0,t.jsx)(n.h3,{id:"behavior-for-unnamed-signals-aka-temporaries",children:'Behavior for "Unnamed signals" (aka "Temporaries")'}),"\n",(0,t.jsxs)(n.p,{children:["If you want to signify that the name of a signal does not matter, you can prefix the name of your val with ",(0,t.jsx)(n.code,{children:"_"}),".\nChisel will preserve the convention of leading ",(0,t.jsx)(n.code,{children:"_"})," signifying an unnamed signal across prefixes.\nFor example:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-scala",children:'class TemporaryExample extends Module {\n  val in0 = IO(Input(UInt(2.W)))\n  val in1 = IO(Input(UInt(2.W)))\n\n  val out = {\n    // We need 2 ports so firtool will maintain the common subexpression\n    val port0 = IO(Output(UInt(4.W)))\n    // out_port1\n    val port1 = IO(Output(UInt(4.W)))\n    val _sum = in0 + in1\n    port0 := _sum + 1.U\n    port1 := _sum - 1.U\n    // port0 is returned so will get the name "out"\n    port0\n  }\n}\n'})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-verilog",children:"// Generated by CIRCT firtool-1.99.2\nmodule TemporaryExample(\n  input        clock,\n               reset,\n  input  [1:0] in0,\n               in1,\n  output [3:0] out,\n               out_port1\n);\n\n  wire [1:0] _out_sum_T = in0 + in1;\n  assign out = {2'h0, _out_sum_T + 2'h1};\n  assign out_port1 = {2'h0, _out_sum_T - 2'h1};\nendmodule\n\n"})}),"\n",(0,t.jsxs)(n.p,{children:["If an unnamed signal is itself used to generate a prefix, the leading ",(0,t.jsx)(n.code,{children:"_"})," will be ignored to avoid double ",(0,t.jsx)(n.code,{children:"__"})," in the names of further nested signals."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-scala",children:"class TemporaryPrefixExample extends Module {\n  val in0 = IO(Input(UInt(2.W)))\n  val in1 = IO(Input(UInt(2.W)))\n  val out0 = IO(Output(UInt(3.W)))\n  val out1 = IO(Output(UInt(4.W)))\n\n  val _sum = {\n    val x = in0 + in1\n    out0 := x\n    x + 1.U\n  }\n  out1 := _sum & 0x2.U\n}\n"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-verilog",children:"// Generated by CIRCT firtool-1.99.2\nmodule TemporaryPrefixExample(\n  input        clock,\n               reset,\n  input  [1:0] in0,\n               in1,\n  output [2:0] out0,\n  output [3:0] out1\n);\n\n  wire [1:0] _sum_x_T = in0 + in1;\n  assign out0 = {1'h0, _sum_x_T};\n  assign out1 = {2'h0, _sum_x_T + 2'h1 & 2'h2};\nendmodule\n\n"})}),"\n",(0,t.jsx)(n.h3,{id:"set-a-module-name",children:"Set a Module Name"}),"\n",(0,t.jsxs)(n.p,{children:["If you want to specify the module's name (not the instance name of a module), you can always override the ",(0,t.jsx)(n.code,{children:"desiredName"}),"\nvalue. Note that you can parameterize the name by the module's parameters. This is an excellent way to make your module\nnames more stable and is highly recommended to do."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-scala",children:'class Example9(width: Int) extends Module {\n  override val desiredName = s"EXAMPLE9WITHWIDTH$width"\n  val in = IO(Input(UInt(width.W)))\n  val out = IO(Output(UInt((width + 2).W)))\n\n  val add = (in + (in + in).suggestName("foo"))\n\n  out := add\n}\n'})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-verilog",children:"// Generated by CIRCT firtool-1.99.2\nmodule EXAMPLE9WITHWIDTH8(\n  input        clock,\n               reset,\n  input  [7:0] in,\n  output [9:0] out\n);\n\n  assign out = {2'h0, in + {in[6:0], 1'h0}};\nendmodule\n\n// Generated by CIRCT firtool-1.99.2\nmodule EXAMPLE9WITHWIDTH1(\n  input        clock,\n               reset,\n               in,\n  output [2:0] out\n);\n\n  assign out = {2'h0, in};\nendmodule\n\n"})})]})}function c(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},8453:(e,n,a)=>{a.d(n,{R:()=>o,x:()=>l});var t=a(6540);const i={},s=t.createContext(i);function o(e){const n=t.useContext(s);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:o(e.components),t.createElement(s.Provider,{value:n},e.children)}}}]);