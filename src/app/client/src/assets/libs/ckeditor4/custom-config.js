/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.basePath = "/assets/libs/ckeditor4/";
var mathElements = [
  "math",
  "maction",
  "maligngroup",
  "malignmark",
  "menclose",
  "merror",
  "mfenced",
  "mfrac",
  "mglyph",
  "mi",
  "mlabeledtr",
  "mlongdiv",
  "mmultiscripts",
  "mn",
  "mo",
  "mover",
  "mpadded",
  "mphantom",
  "mroot",
  "mrow",
  "ms",
  "mscarries",
  "mscarry",
  "msgroup",
  "msline",
  "mspace",
  "msqrt",
  "msrow",
  "mstack",
  "mstyle",
  "msub",
  "msup",
  "msubsup",
  "mtable",
  "mtd",
  "mtext",
  "mtr",
  "munder",
  "munderover",
  "semantics",
  "annotation",
  "annotation-xml"
];
CKEDITOR.plugins.addExternal(
  "ckeditor_wiris",
  "plugins/ckeditor_wiris/",
  "plugin.js"
);
CKEDITOR.editorConfig = function(config) {

  // Define changes to default configuration here.
  // For complete reference see:
  // https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_config.html

  // For now, MathType is incompatible with CKEditor file upload plugins.
  config.removePlugins =
    "uploadimage,uploadwidget,uploadfile,filetools,filebrowser,image";
  // https://ckeditor.com/docs/ckeditor4/latest/features/toolbar.html#custom-toolbar-demo
  config.toolbar = [
    {
      name: "basicstyles",
      items: ["Bold", "Italic", "Underline", "FontSize"]
    },
    {
      name: "paragraph",
      items: ["NumberedList"]
    },

    {
      name: "wiris",
      items: [
        "ckeditor_wiris_formulaEditor",
        "ckeditor_wiris_formulaEditorChemistry"
      ]
    },
    {
      name: "basicstyles",
      items: ["Subscript", "Superscript"]
    },
    // {
    //   name: "insert",
    //   items: ["EasyImageUpload"]
    // },
    {
      name: "document",
      items: ["Source"]
    }
  ];
  config.resize_enabled = false;
  config.extraPlugins =
    "ckeditor_wiris,font,easyimage,divarea,autogrow,elementspath,resize"; //easyimage
  config.fontSize_sizes =
    "9/9px;11/11px;13/13px;15/15px;17/17px;19/19px;21/21px;23/23px;25/25px;";
    config.autoGrow_minHeight = 200;
  config.fullPage = true;
  config.allowedContent = true;
  // Remove some buttons provided by the standard plugins, which are
  // not needed in the Standard(s) toolbar.
  config.removeButtons = ""; // Underline,Subscript,Superscript

  // Set the most common block elements.
  config.format_tags = "p;h1;h2;h3;pre";
  config.easyimage_toolbar = [
    "EasyImageAlignLeft",
    "EasyImageAlignCenter",
    "EasyImageAlignRight"
  ];
  // Simplify the dialog windows.
  config.removeDialogTabs = "image:advanced;link:advanced";

  // Update the ACF configuration with MathML syntax.
  config.extraAllowedContent =
    mathElements.join(" ") +
    "(*)[*]{*};img[data-mathml,data-custom-editor,role](Wirisformula)";
};
