<template>
  <div id="app">
    <div id="blocklyDiv"></div>

    <h1>PXT-Blockly Playground</h1>

    <p><a href="javascript:void(workspace.setVisible(true))">Show</a>
    - <a href="javascript:void(workspace.setVisible(false))">Hide</a></p>

    <form id="options">
      <select name="toolbox" onchange="document.forms.options.submit()">
        <option value="categories">Categories (untyped variables)</option>
        <option value="categories-typed-variables">Categories (typed variables)</option>
        <option value="simple">Simple</option>
        <option value="test-blocks">Test Blocks</option>
      </select>
      <select name="side" onchange="document.forms.options.submit()">
        <option value="start">Start</option>
        <option value="end">End</option>
        <option value="top">Top</option>
        <option value="bottom">Bottom</option>
      </select>
    </form>

    <p>
      <input type="button" value="Export to XML" onclick="toXml()">
      &nbsp;
      <input type="button" value="Import from XML" onclick="fromXml()" id="import">
      <br>
      <input type="button" value="To JavaScript" onclick="toCode('JavaScript')">
      &nbsp;
      <input type="button" value="To Python" onclick="toCode('Python')">
      &nbsp;
      <input type="button" value="To PHP" onclick="toCode('PHP')">
      &nbsp;
      <input type="button" value="To Lua" onclick="toCode('Lua')">
      &nbsp;
      <input type="button" value="To Dart" onclick="toCode('Dart')">
      <br>
      <textarea id="importExport" style="width: 26%; height: 12em"
        onchange="taChange();" onkeyup="taChange()"></textarea>
    </p>

    <p>
      Stress test: &nbsp;
      <input type="button" value="Airstrike!" onclick="airstrike(100)">
      <input type="button" value="Spaghetti!" onclick="spaghetti(8)">
    </p>

    <p>
      Center on block : &nbsp;
      <input type="button" value="center on last clicked block" onclick="centerOnBlock()" />
    </p>

    <p>
      Highlight: &nbsp;
      <input type="button" value="Highlight last clicked block" onclick="highlightBlock()" />
      <input type="button" value="Unhighlight last clicked block" onclick="unhighlightBlock()" />
    </p>

    <p>
      Warning: &nbsp;
      <input type="button" value="Set warning on last clicked block" onclick="highlightBlockWarning()" />
      <input type="button" value="Remove warning from last clicked block" onclick="unhighlightBlockWarning()" />
    </p>

    <p>
      Glows: &nbsp;
      <input type="button" value="Glow last clicked block" onclick="glowBlock()" />
      <input type="button" value="Unglow last clicked block" onclick="unglowBlock()" />
      <input type="button" value="Stack glow last clicked block" onclick="glowStack()" />
      <input type="button" value="Stack unglow last clicked block" onclick="unglowStack()" />
    </p>

    <p>
      <input type="button" value="Undo" onclick="workspace.undo()" />
      <input type="button" value="Redo" onclick="workspace.undo(true)" />
    </p>

    <p>
      Log events: &nbsp;
      <input type="checkbox" onclick="logEvents(this.checked)" id="logCheck">
    </p>

    <div v-html="blocks">
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {},
  data() {
    return {
      blocks: `
        <!-- The next three blocks of XML are sample toolboxes for testing basic
        configurations.  For more information on building toolboxes, see https://developers.google.com/blockly/guides/configure/web/toolbox -->

        <!-- toolbox-categories has a category menu and an auto-closing flyout.  The
        Variables category uses untyped variable blocks.
        See https://developers.google.com/blockly/guides/create-custom-blocks/variables#untyped_variable_blocks for more information. -->
        <xml id="toolbox-categories" style="display: none">
          <category name="Logic" colour="210" iconclass="blocklyTreeIconCustom">
            <block type="controls_if">
              <value name="IF0">
                <shadow type="logic_boolean">
                </shadow>
              </value>
            </block>
            <block type="controls_if">
              <mutation else="1"></mutation>
              <value name="IF0">
                <shadow type="logic_boolean">
                </shadow>
              </value>
            </block>
            <block type="logic_compare">
              <value name="A">
                <shadow type="math_number">
                  <field name="NUM">10</field>
                </shadow>
              </value>
              <value name="B">
                <shadow type="math_number">
                  <field name="NUM">10</field>
                </shadow>
              </value>
            </block>
            <block type="logic_operation"></block>
            <block type="logic_negate"></block>
            <block type="logic_boolean"></block>
            <block type="logic_null" disabled="true"></block>
            <block type="logic_ternary"></block>
          </category>
          <category name="Loops" colour="120" iconclass="blocklyTreeIconCustom">
            <block type="controls_repeat_ext">
              <value name="TIMES">
                <shadow type="math_number">
                  <field name="NUM">10</field>
                </shadow>
              </value>
            </block>
            <block type="controls_repeat" disabled="true"></block>
            <block type="controls_whileUntil" disabled="true"></block>
            <block type="controls_for">
              <value name="VAR">
                <shadow type="variables_get_reporter">
                  <field name="VAR">index</field>
                </shadow>
              </value>
              <value name="FROM">
                <shadow type="math_number">
                  <field name="NUM">1</field>
                </shadow>
              </value>
              <value name="TO">
                <shadow type="math_number">
                  <field name="NUM">10</field>
                </shadow>
              </value>
              <value name="BY">
                <shadow type="math_number">
                  <field name="NUM">1</field>
                </shadow>
              </value>
            </block>
            <block type="controls_forEach">
              <value name="VAR">
                <shadow type="variables_get_reporter">
                  <field name="VAR">item</field>
                </shadow>
              </value>
            </block>
            <block type="controls_flow_statements"></block>
          </category>
          <category name="Math" colour="230" iconclass="blocklyTreeIconCustom">
            <block type="math_number" gap="32">
              <field name="NUM">123</field>
            </block>
            <block type="math_number_minmax" gap="32">
              <mutation min="0" max="100"></mutation>
            </block>
            <block type="math_arithmetic">
              <value name="A">
                <shadow type="math_number">
                  <field name="NUM">1</field>
                </shadow>
              </value>
              <value name="B">
                <shadow type="math_number">
                  <field name="NUM">1</field>
                </shadow>
              </value>
            </block>
            <block type="math_single">
              <value name="NUM">
                <shadow type="math_number">
                  <field name="NUM">9</field>
                </shadow>
              </value>
            </block>
            <block type="math_trig">
              <value name="NUM">
                <shadow type="math_number">
                  <field name="NUM">45</field>
                </shadow>
              </value>
            </block>
            <block type="math_constant"></block>
            <block type="math_number_property">
              <value name="NUMBER_TO_CHECK">
                <shadow type="math_number">
                  <field name="NUM">0</field>
                </shadow>
              </value>
            </block>
            <block type="math_round">
              <value name="NUM">
                <shadow type="math_number">
                  <field name="NUM">3.1</field>
                </shadow>
              </value>
            </block>
            <block type="math_on_list"></block>
            <block type="math_modulo">
              <value name="DIVIDEND">
                <shadow type="math_number">
                  <field name="NUM">64</field>
                </shadow>
              </value>
              <value name="DIVISOR">
                <shadow type="math_number">
                  <field name="NUM">10</field>
                </shadow>
              </value>
            </block>
            <block type="math_constrain">
              <value name="VALUE">
                <shadow type="math_number">
                  <field name="NUM">50</field>
                </shadow>
              </value>
              <value name="LOW">
                <shadow type="math_number">
                  <field name="NUM">1</field>
                </shadow>
              </value>
              <value name="HIGH">
                <shadow type="math_number">
                  <field name="NUM">100</field>
                </shadow>
              </value>
            </block>
            <block type="math_random_int">
              <value name="FROM">
                <shadow type="math_number">
                  <field name="NUM">1</field>
                </shadow>
              </value>
              <value name="TO">
                <shadow type="math_number">
                  <field name="NUM">100</field>
                </shadow>
              </value>
            </block>
            <block type="math_random_float"></block>
          </category>
          <category name="Text" colour="160" iconclass="blocklyTreeIconCustom">
            <block type="text"></block>
            <block type="text_join"></block>
            <!--<block type="text_append">
              <value name="TEXT">
                <shadow type="text"></shadow>
              </value>
            </block>-->
            <block type="text_length">
              <value name="VALUE">
                <shadow type="text">
                  <field name="TEXT">abc</field>
                </shadow>
              </value>
            </block>
            <block type="text_isEmpty">
              <value name="VALUE">
                <shadow type="text">
                  <field name="TEXT"></field>
                </shadow>
              </value>
            </block>
            <block type="text_indexOf">
              <value name="VALUE">
                <block type="variables_get">
                  <field name="VAR">text</field>
                </block>
              </value>
              <value name="FIND">
                <shadow type="text">
                  <field name="TEXT">abc</field>
                </shadow>
              </value>
            </block>
            <block type="text_charAt">
              <value name="VALUE">
                <block type="variables_get">
                  <field name="VAR">text</field>
                </block>
              </value>
            </block>
            <block type="text_getSubstring">
              <value name="STRING">
                <block type="variables_get">
                  <field name="VAR">text</field>
                </block>
              </value>
            </block>
            <block type="text_changeCase">
              <value name="TEXT">
                <shadow type="text">
                  <field name="TEXT">abc</field>
                </shadow>
              </value>
            </block>
            <block type="text_trim">
              <value name="TEXT">
                <shadow type="text">
                  <field name="TEXT">abc</field>
                </shadow>
              </value>
            </block>
            <block type="text_count">
              <value name="SUB">
                <shadow type="text"></shadow>
              </value>
              <value name="TEXT">
                <shadow type="text"></shadow>
              </value>
            </block>
            <block type="text_replace">
              <value name="FROM">
                <shadow type="text"></shadow>
              </value>
              <value name="TO">
                <shadow type="text"></shadow>
              </value>
              <value name="TEXT">
                <shadow type="text"></shadow>
              </value>
            </block>
            <block type="text_reverse">
              <value name="TEXT">
                <shadow type="text"></shadow>
              </value>
            </block>
            <label text="Input/Output:" web-class="ioLabel"></label>
            <block type="text_print">
              <value name="TEXT">
                <shadow type="text">
                  <field name="TEXT">abc</field>
                </shadow>
              </value>
            </block>
            <block type="text_prompt_ext">
              <value name="TEXT">
                <shadow type="text">
                  <field name="TEXT">abc</field>
                </shadow>
              </value>
            </block>
          </category>
          <category name="Lists" colour="260" iconclass="blocklyTreeIconCustom">
            <block type="lists_create_with">
              <mutation items="0" type="math_number"></mutation>
            </block>
            <block type="lists_create_with">
              <mutation items="3" type="text"></mutation>
              <value name="ADD0">
                <shadow type="math_number">
                  <field name="NUM">1</field>
                </shadow>
              </value>
              <value name="ADD1">
                <shadow type="math_number">
                  <field name="NUM">2</field>
                </shadow>
              </value>
              <value name="ADD2">
                <shadow type="math_number">
                  <field name="NUM">3</field>
                </shadow>
              </value>
            </block>
            <block type="lists_create_with">
              <mutation items="2" type="text"></mutation>
              <value name="ADD0">
                <shadow type="text">
                  <field name="TEXT">Hello</field>
                </shadow>
              </value>
              <value name="ADD1">
                <shadow type="text">
                  <field name="TEXT">World</field>
                </shadow>
              </value>
            </block>
            <block type="lists_repeat">
              <value name="NUM">
                <shadow type="math_number">
                  <field name="NUM">5</field>
                </shadow>
              </value>
            </block>
            <block type="lists_length"></block>
            <block type="lists_isEmpty"></block>
            <block type="lists_indexOf"></block>
            <block type="lists_getIndex"></block>
            <block type="lists_setIndex"></block>
            <block type="lists_getSublist"></block>
            <block type="lists_split">
              <value name="DELIM">
                <shadow type="text">
                  <field name="TEXT">,</field>
                </shadow>
              </value>
            </block>
            <block type="lists_sort"></block>
            <block type="lists_reverse"></block>
          </category>
          <category name="Colour" colour="20" iconclass="blocklyTreeIconCustom">
            <block type="colour_picker"></block>
            <block type="colour_random"></block>
            <block type="colour_rgb">
              <value name="RED">
                <shadow type="math_number">
                  <field name="NUM">100</field>
                </shadow>
              </value>
              <value name="GREEN">
                <shadow type="math_number">
                  <field name="NUM">50</field>
                </shadow>
              </value>
              <value name="BLUE">
                <shadow type="math_number">
                  <field name="NUM">0</field>
                </shadow>
              </value>
            </block>
            <block type="colour_blend">
              <value name="COLOUR1">
                <shadow type="colour_picker">
                  <field name="COLOUR">#ff0000</field>
                </shadow>
              </value>
              <value name="COLOUR2">
                <shadow type="colour_picker">
                  <field name="COLOUR">#3333ff</field>
                </shadow>
              </value>
              <value name="RATIO">
                <shadow type="math_number">
                  <field name="NUM">0.5</field>
                </shadow>
              </value>
            </block>
          </category>
          <sep></sep>
          <category name="Variables" colour="330" custom="VARIABLE"></category>
          <category name="Functions" colour="290" custom="PROCEDURE"></category>
        </xml>`
    }
  },

  mounted() {
    const loadScript = (scriptName) => {
      const domElement = document.createElement('script');
      domElement.setAttribute('src', scriptName);
      document.head.appendChild(domElement);
      console.log("LOADED");
    };

    // Load all the generators and blocks afterwards
    // Note that Closure & blockly must have been initialized previously!
    const scriptList = [
      "blockly/generators/javascript.js",
      "blockly/generators/javascript/logic.js",
      "blockly/generators/javascript/loops.js",
      "blockly/generators/javascript/math.js",
      "blockly/generators/javascript/text.js",
      "blockly/generators/javascript/lists.js",
      "blockly/generators/javascript/colour.js",
      "blockly/generators/javascript/variables.js",
      "blockly/generators/javascript/variables_dynamic.js",
      "blockly/generators/javascript/procedures.js",
      "blockly/generators/python.js",
      "blockly/generators/python/logic.js",
      "blockly/generators/python/loops.js",
      "blockly/generators/python/math.js",
      "blockly/generators/python/text.js",
      "blockly/generators/python/lists.js",
      "blockly/generators/python/colour.js",
      "blockly/generators/python/variables.js",
      "blockly/generators/python/variables_dynamic.js",
      "blockly/generators/python/procedures.js",
      "blockly/generators/php.js",
      "blockly/generators/php/logic.js",
      "blockly/generators/php/loops.js",
      "blockly/generators/php/math.js",
      "blockly/generators/php/text.js",
      "blockly/generators/php/lists.js",
      "blockly/generators/php/colour.js",
      "blockly/generators/php/variables.js",
      "blockly/generators/php/variables_dynamic.js",
      "blockly/generators/php/procedures.js",
      "blockly/generators/lua.js",
      "blockly/generators/lua/logic.js",
      "blockly/generators/lua/loops.js",
      "blockly/generators/lua/math.js",
      "blockly/generators/lua/text.js",
      "blockly/generators/lua/lists.js",
      "blockly/generators/lua/colour.js",
      "blockly/generators/lua/variables.js",
      "blockly/generators/lua/variables_dynamic.js",
      "blockly/generators/lua/procedures.js",
      "blockly/generators/dart.js",
      "blockly/generators/dart/logic.js",
      "blockly/generators/dart/loops.js",
      "blockly/generators/dart/math.js",
      "blockly/generators/dart/text.js",
      "blockly/generators/dart/lists.js",
      "blockly/generators/dart/colour.js",
      "blockly/generators/dart/variables.js",
      "blockly/generators/dart/variables_dynamic.js",
      "blockly/generators/dart/procedures.js",
      "blockly/msg/messages.js",
      "blockly/blocks/extensions.js",
      "blockly/blocks/logic.js",
      "blockly/blocks/loops.js",
      "blockly/blocks/math.js",
      "blockly/blocks/text.js",
      "blockly/blocks/lists.js",
      "blockly/blocks/colour.js",
      "blockly/blocks/variables.js",
      "blockly/blocks/variables_dynamic.js",
      "blockly/blocks/procedures.js"
    ];

    for(let scriptName of scriptList) {
      loadScript(scriptName);
    }

    function setBackgroundColor() {
      var lilac = '#d6d6ff';
      var currentPage = window.location.href;
      var regexFile = /^file[\S]*$/;

      if (regexFile.test(currentPage)) {
        document.getElementsByTagName('body')[0].style.backgroundColor = lilac;
      }
    }

    let workspace = null;
    function start() {
      setBackgroundColor();

      // Create main workspace.
      workspace = Blockly.inject('blocklyDiv',
          {
            comments: true,
            collapse: true,
            disable: true,
            grid:
              {
                spacing: 25,
                length: 3,
                colour: '#ccc',
                snap: true
              },
            horizontalLayout: false,
            maxBlocks: Infinity,
            media: '../media/',
            oneBasedIndex: true,
            readOnly: false,
            rtl: false,
            scrollbars: true,
            toolbox:  document.getElementById('toolbox-categories'),
            toolboxPosition: 'start',
            toolboxOptions:
              {
                color: true,
                inverted: true
              },
            zoom:
              {
                controls: true,
                wheel: true,
                startScale: 1.0,
                maxScale: 4,
                minScale: .25,
                scaleSpeed: 1.1
              }
          });
      // Restore previously displayed text.
      if (sessionStorage) {
        var text = sessionStorage.getItem('textarea');
        if (text) {
          document.getElementById('importExport').value = text;
        }
        // Restore event logging state.
        var state = sessionStorage.getItem('logEvents');
        logEvents(Boolean(Number(state)));
      } else {
        // MSIE 11 does not support sessionStorage on file:// URLs.
        logEvents(false);
      }
      taChange();
    }

    function taChange() {
      var textarea = document.getElementById('importExport');
      if (sessionStorage) {
        sessionStorage.setItem('textarea', textarea.value);
      }
      var valid = true;
      try {
        Blockly.Xml.textToDom(textarea.value);
      } catch (e) {
        valid = false;
      }
      document.getElementById('import').disabled = !valid;
    }

    function logEvents(state) {
      var checkbox = document.getElementById('logCheck');
      checkbox.checked = state;
      if (sessionStorage) {
        sessionStorage.setItem('logEvents', Number(state));
      }
      if (state) {
        workspace.addChangeListener(logger);
      } else {
        workspace.removeChangeListener(logger);
      }
    }

    function logger(e) {
      console.log(e);
    }
    start();
  }
}
</script>

<style>
html, body {
  height: 100%;
}
body {
  background-color: #fff;
  font-family: sans-serif;
  overflow: hidden;
}
h1 {
  font-weight: normal;
  font-size: 140%;
}
#blocklyDiv {
  float: right;
  height: 95%;
  width: 70%;
}
#importExport {
  font-family: monospace;
}

.ioLabel>.blocklyFlyoutLabelText {
  font-style: italic;
}

.blocklyTreeIconCustom {
  background: none;
  font-family: 'FontAwesome';
  margin: -0.2em 0.25em 0.0em 0.25em;
  width: 1.18em;
}
.blocklyFlyoutHeading {
  font-family: 'FontAwesome';
}
.blocklyTreeIconCustom::before {
  content: "\f12e";
}

#app {
  height: 100%;
}

.blocklyToolboxDiv {
  height: 200px !important;
}
.injectionDiv svg {
  height: 200px !important;
}
</style>
