
// Declare Namespace
window.org = {ckeditor: {}};
var mathtext_plugin = function() {
    this.callbackFn = undefined;
}

mathtext_plugin.prototype.init = function(obj) {
    loadDataFromCkEditortoPopup(obj);
}

mathtext_plugin.prototype.modal = function(data) {
    this.init(data.detail);
    this.callbackFn = data.onInit;
    console.log(this);
}

window.org.ckeditor.mathtext = new mathtext_plugin()
mathtext_plugin = undefined

    var mathField, latex, latexSpan;
    $('#advInput').val('');
    $("#text_hint").show();
    var MQ = MathQuill.getInterface(2);
    var valid = false;
    var libraryEquations = [{
            "title": "Area of circle",
            "latex": "A = \\pi r^2"
        },
        {
            "title": "Quadratic equation",
            "latex": "x = \\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}"
        },
        {
            "title": "Binomial theorem",
            "latex": "(x+a)^n = \\sum _{k=0}^n(\\frac{n_{ }}{k})x^ka^{n-k}"
        },
        {
            "title": "Expansion of a sum",
            "latex": "(1+x)^n=1+\\frac{nx}{1!}+\\frac{n(n-1)x^2}{2!}+......."
        },
        {
            "title": "Fourier series",
            "latex": "f(x)=a_0+\\sum _{n=1}^{\\infty }(a_n\\cos \\frac{n\\Pi x}{L}+b_n\\sin \\frac{n\\Pi x}{L})"
        },
        {
            "title": "Slope of a line",
            "latex": "m=\\frac{y_2-y_1}{x_2-x_1}"
        },
        {
            "title": "Distance between two points",
            "latex": "d=\\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}"
        },
        {
            "title": "Volume of a sphere",
            "latex": "\\frac{4}{3}\\pi r^3"
        },
        {
            "title": "Product rule",
            "latex": "a^n\\times a^m=a^{n+m}"
        }
    ];
    var symbols = {
        greek: [{
                latex: "\\alpha"
            },
            {
                latex: "\\beta"
            },
            {
                latex: "\\delta"
            },
            {
                latex: "\\epsilon"
            },
            {
                latex: "\\eta"
            },
            {
                latex: "\\gamma"
            },
            {
                latex: "\\iota"
            },
            {
                latex: "\\kappa"
            },
            {
                latex: "\\lambda"
            },
            {
                latex: "\\mu"
            },
            {
                latex: "\\nu"
            },
            {
                latex: "o"
            },
            {
                latex: "\\omega"
            },
            {
                latex: "\\phi"
            },
            {
                latex: "\\pi"
            },
            {
                latex: "\\psi"
            },
            {
                latex: "\\rho"
            },
            {
                latex: "\\sigma"
            },
            {
                latex: "\\tau"
            },
            {
                latex: "\\theta"
            },
            {
                latex: "\\upsilon"
            },
            {
                latex: "\\xi"
            },
            {
                latex: "\\zeta"
            },
            {
                latex: "\\Delta"
            },
            {
                latex: "\\Gamma"
            },
            {
                latex: "\\Lambda"
            },
            {
                latex: "\\Omega"
            },
            {
                latex: "\\Phi"
            },
            {
                latex: "\\Pi"
            },
            {
                latex: "\\Psi"
            },
            {
                latex: "\\Sigma"
            },
            {
                latex: "\\Theta"
            },
            {
                latex: "\\Upsilon"
            }
        ],
        binary: [{
                latex: "\\ast"
            },
            {
                latex: "\\times"
            },
            {
                latex: "\\div"
            },
            {
                latex: "\\cdot"
            },
            {
                latex: "\\equiv"
            },
            {
                latex: "\\cong"
            },
            {
                latex: "\\ne"
            },
            {
                latex: "\\sim"
            },
            {
                latex: "\\simeq"
            },
            {
                latex: "\\approx"
            },
            {
                latex: "\\propto"
            },
            {
                latex: "\\models"
            },
            // {
            //   latex: "\\approxeq"
            // },
            {
                latex: "\\pm"
            },
            {
                latex: "\\mp"
            },
            {
                latex: "\\leq"
            },
            {
                latex: "\\ll"
            },
            {
                latex: "\\subset"
            },
            {
                latex: "\\subseteq"
            },
            {
                latex: "\\in"
            },
            {
                latex: "\\perp"
            },
            {
                latex: "\\mid"
            },
            {
                latex: "\\parallel"
            },
            {
                latex: "\\notin"
            },
            {
                latex: "\\cap"
            },
            {
                latex: "\\cup"
            },
            {
                latex: "\\geq"
            },
            {
                latex: "\\wedge"
            },
            {
                latex: "\\vee"
            },
            {
                latex: "\\gg"
            },
            {
                latex: "\\supset"
            },
            {
                latex: "\\supseteq"
            },
            {
                latex: "a^b"
            },
            {
                latex: "\\lt"
            },
            {
                latex: "\\gt"
            },
            {
                latex: "\\+"
            },
            {
                latex: "\\-"
            }
        ],
        arrow: [{
                latex: "\\leftarrow"
            },
            {
                latex: "\\Leftarrow"
            },
            {
                latex: "\\rightarrow"
            },
            {
                latex: "\\Rightarrow"
            },
            {
                latex: "\\leftrightarrow"
            },
            {
                latex: "\\Leftrightarrow"
            },
            // {
            //   latex: "\\dashrightarrow"
            // },
            // {
            //   latex: "\\leftrightarrows"
            // },
            // {
            //   latex: "\\rightleftharpoons"
            // },
            {
                latex: "\\rightharpoonup"
            },
            {
                latex: "\\rightharpoondown"
            },
            // {
            //   latex: "\\dashleftarrow"
            // },
            // {
            //   latex: "\\leftrightharpoons"
            // }
        ],
        misc: [{
                latex: "\\infty"
            },
            {
                latex: "\\nabla"
            },
            {
                latex: "\\partial"
            },
            {
                latex: "\\angle"
            },
            {
                latex: "\\measuredangle"
            },
            {
                latex: "\\triangle"
            },
            {
                latex: "\\square"
            },
            {
                latex: "\\overrightarrow{AB}"
            },
            {
                latex: "A^T"
            },
            {
                latex: "A^{-1}"
            },
            {
                latex: "^c"
            },
            {
                latex: "^g"
            },
            {
                latex: "\\overline{x}"
            },
            {
                latex: "\\vec{x}"
            },
            {
                latex: "\\hat{x}"
            }
        ]
    };
    var equations = {
        trig: [{
                latex: "\\sin\\theta"
            },
            {
                latex: "\\cos\\theta"
            },
            {
                latex: "\\sec\\theta"
            },
            {
                latex: "\\csc\\theta"
            },
            {
                latex: "\\tan\\theta"
            },
            {
                latex: "\\cot\\theta"
            },
            {
                latex: "\\log_{}\\left(\\right)",
                latexDisplay: "\\log_{b}a"
            },
            {
                latex: "\\lg"
            },
            {
                latex: "\\ln"
            },
            {
                latex: "\\lim_{x\\to\\infty}\\left(\\right)",
                latexDisplay: "lim"
            },
            {
                latex: "\\dim"
            },
            {
                latex: "y^{(n)}"
            },
            {
                latex: "\\frac{dy}{dx}"
            },
            {
                latex: "\\frac{d^2y}{dx^2}"
            },
            {
                latex: "\\frac{d^ny}{dx^n}"
            },
            {
                latex: "\\frac{\\partial f(x,y)}{\\partial x}"
            },
            {
                latex: "\\int "
            },
            {
                latex: "\\int _{ }^{ }"
            },
            {
                latex: "\\oint"
            }
        ],
        supsub: [{
                latex: "x^2",
                latexDisplay: "x^2"
            },
            {
                latex: "e^{ }",
                latexDisplay: "e^{\\square}"
            },
            {
                latex: "{ }^{ }",
                latexDisplay: "\\square^\\square"
            },
            {
                latex: "x_2",
                latexDisplay: "x_2"
            },
            {
                latex: "{ }_{ }",
                latexDisplay: "\\square_\\square"
            }
        ],
        root: [{
                latexCmd: "\\sqrt",
                latexDisplay: "\\sqrt{\\square}"
            },
            {
                latexCmd: "\\nthroot",
                latexDisplay: "\\sqrt[\\square]{\\square}"
            },
            {
                latex: "\\sqrt[3]{}",
                latexDisplay: "\\sqrt[3]{a}"
            },
            {
                latex: "\\sqrt[4]{}",
                latexDisplay: "\\sqrt[4]{a}"
            }
        ],
        frac: [{
            latex: "\\frac{ }{ }",
            latexDisplay: "\\frac{\\square}{\\square}"
        }],
        misc: [{
                latex: "\\sigma^2",
                latexDisplay: "\\sigma^2"
            },
            {
                latex: "\\sigma_X",
                latexDisplay: "\\sigma_X"
            },
            {
                latex: "\\rho_{X,Y}",
                latexDisplay: "\\rho_{X,Y}"
            },
            {
                latex: "_n P^k",
                latexDisplay: "_n P^k"
            },
            {
                latex: "_n C^k",
                latexDisplay: "_n C^k"
            },
            {
                latex: "\\binom{n}{k}"
            }
        ]
    };
    var advancedSymbols = [{
            latexText: "\\begin{vmatrix} a&b\\\\ c&d\\\\ \\end{vmatrix}"
        },
        {
            latexText: "\\begin{matrix} a&b\\\\ c&d\\\\ \\end{matrix}"
        },
        {
            latexText: "\\begin{bmatrix} a&b\\\\ c&d\\\\ \\end{bmatrix}"
        },
        {
            latexText: "\\xrightarrow{\\Delta}"
        },
        {
            latexText: "\\sphericalangle"
        },
        {
            latexText: "\\xleftrightharpoons{abc}",
            customImage: 'assets/equilibrium.png'
        },
        {
            latexText: "\\leftrightarrows"
        },
        {
            latexText: "\\widetilde{a}"
        },
        {
            latexText: "\\overgroup{AB}",
            customImage: 'assets/arc.png'
        }
    ];
    var advancedTabImageArray = [];
    advancedSymbols.forEach(function(value, index) {
        var url;
        if (value.customImage) {
            // url = ecEditor.resolvePluginResource(instance.manifest.id, instance.manifest.ver, value.customImage);
            url = value.customImage;
        } else {
            url = "https://latex.codecogs.com/gif.latex?" + encodeURIComponent(value.latexText);
            console.log(url);
        }
        advancedTabImageArray.push(url);
    });

    function generateLibraryView(equations, name) {
        var html = '';
        for (var index = 0; index < equations.length; index++) {
            var equation = equations[index];
            var equationHtml = renderToString(equation.latex);
            html += '<div class="item select list-items math-lib" onclick=\'latexToEquations(' + JSON.stringify(equation) + ')\'>' +
                '<div class="middle aligned content">' +
                '<div class="math-lib-header">' + equation.title + '</div>' +
                '<div class="meta math-lib-meta" id="' + name + index + '">' + equationHtml + '</div>' +
                '</div></div>';
        }
        $("#libraryEquation").html(html);
    }

    function renderToString(string) {
        return katex.renderToString(string, {
            throwOnError: false
        });
    }

    function generateSymbolView(equations, name) {
        var html = '';
        var symbolHtml, mqClass, symbol = '';
        for (var index = 0; index < equations.length; index++) {
            symbol = equations[index];
            if (name == 'Greek') {
                symbolHtml = renderToString(symbol.latexDisplay ? symbol.latexDisplay : symbol.latex);
            } else {
                mqClass = 'mq-render'
                symbolHtml = symbol.latexDisplay ? symbol.latexDisplay : symbol.latex;
            }
            html += '<div class="two wide column math-symbols">' +
                '<span class="symbol-div">' +
                '<div class="math-symbol ' + mqClass + '" id="' + name + index + '" onclick=\'latexToEquations(' + JSON.stringify(symbol) + ')\' >' + symbolHtml + '</div>' +
                '<span class="symbol-latex">' + symbol.latex + '</span>' +
                '</span> </div>';
        }
        $("#symbol" + name).append(html);
    }

    function generateEquationView(equations, name) {
        var html = '';
        var symbolHtml, mqClass, symbol = '';
        for (var index = 0; index < equations.length; index++) {
            symbol = equations[index];
            if (name == 'Root') {
                symbolHtml = renderToString(symbol.latexDisplay ? symbol.latexDisplay : symbol.latex);
            } else {
                mqClass = 'mq-render'
                symbolHtml = symbol.latexDisplay ? symbol.latexDisplay : symbol.latex;
            }
            html += '<div class="two wide column math-symbols">' +
                '<span class="symbol-div">' +
                '<div class="math-symbol ' + mqClass + '" id="' + name + index + '" onclick=\'latexToEquations(' + JSON.stringify(symbol) + ')\' >' + symbolHtml + '</div>' +
                '<span class="symbol-latex">' + symbol.latex + '</span>' +
                '</span> </div>';
        }
        $("#equation" + name).append(html);
    }

    function generateAdvancedSymbolsView(equations, name) {
        var html = '';
        var equation, equationHtml, imgUrl = '';
        for (var index = 0; index < equations.length; index++) {
            var equation = equations[index];
            html += '<div class="four wide column math-symbols"><span class="advanc-symbol-div">' +
                '<div class="math-symbol" id="' + name + index + '" onclick=\'latexToEquations(' + JSON.stringify(equation) + ')\'>' +
                '<img src="' + advancedTabImageArray[index] + '">' +
                '</div> </span>' +
                '</div></div></div>';
        }
        $("#advancedSymbols").append(html);
        $('.mq-render').each(function(index, element) {
        MQ.StaticMath(element);
    });
    }

    generateLibraryView(libraryEquations, 'libFormula');
    generateSymbolView(symbols.greek, 'Greek');
    generateSymbolView(symbols.binary, 'Binary');
    generateSymbolView(symbols.arrow, 'Arrow');
    generateSymbolView(symbols.misc, 'Misc');
    generateEquationView(equations.trig, 'Trig');
    generateEquationView(equations.supsub, 'Supsub');
    generateEquationView(equations.root, 'Root');
    generateEquationView(equations.frac, 'Frac');
    generateEquationView(equations.misc, 'Misc');
    generateAdvancedSymbolsView(advancedSymbols, 'advancedSymbols');

    $('.mq-render').each(function(index, element) {
        MQ.StaticMath(element);
    });

    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1)
    }

    var advanceField = false;
    $("#advanceFieldMath").show();
    $("#advanceFieldInput").hide();
    var activeTab = "library";

    setTimeout(function() {
        $('.menu .item').tab({
            onVisible: function(e) {
                if (e == 'advanced') {
                    advanceField = true;
                    $("#advanceFieldMath").hide();
                    $("#advanceFieldInput").show();
                    $("#text_hint").hide();
                } else {
                    $("#text_hint").show();
                }
                // before tab swiched
                if (e != 'advanced' && activeTab == 'advanced') {
                    advanceField = false;
                    $("#advanceFieldMath").show();
                    $("#advanceFieldInput").hide();
                    var latexVal = $('#advInput').val();
                    mathField.latex('');
                    mathField.write(latexVal);
                    if (_.isEmpty(mathField.latex())) {
                        $('#advInput').val(latexVal);
                        advanceField = true;
                        $("#advanceFieldMath").hide();
                        $("#advanceFieldInput").show();
                    } else {
                        advanceField = false;
                        $("#advanceFieldMath").show();
                        $("#advanceFieldInput").hide();
                    }
                }
                activeTab = e;
            }
        });
        $('.ui.dropdown.equations-dropdown').dropdown({
            onChange: function(val, text, $choice) {
                val = val.capitalize();
                if (val != 'All') {
                    $(".equationGroup").hide();
                    $("#equation" + val).show();
                } else {
                    $(".equationGroup").show();
                }
            }
        });
        $('.ui.dropdown.symbols-dropdown').dropdown({
            onChange: function(val, text, $choice) {
                val = val.capitalize();
                if (val != 'All') {
                    $(".symbolGroup").hide();
                    $("#symbol" + val).show();
                } else {
                    $(".symbolGroup").show();
                }
            }
        });
    }, 1000);

    setTimeout(function() {
        var mathFieldSpan = document.getElementById('math-field');
        latexSpan = document.getElementById('latex');
        mathField = MQ.MathField(mathFieldSpan, {
            spaceBehavesLikeTab: true,
            handlers: {
                edit: function() {
                    latexSpan.textContent = mathField.latex();
                    $('#advInput').val(latexSpan.textContent);
                    valid = true;
                }
            }
        });
        window.mathField = mathField;
        $(mathFieldSpan).keydown(function(e) {
            if (e.keyCode == 86 || e.keycode == 13) { //keycode value for "v"
                setTimeout(function() {
                    if (!valid) { // checks if the pasted value is not valid
                        // ecEditor.dispatchEvent("org.ekstep.toaster:error", {
                        //   title: 'Incorrect formula entered.',
                        //   position: 'topCenter',
                        // });
                        alert("Incorrect formula entered.");
                    }
                    valid = false;
                }, 1);
            }
        });
    }, 300);

    function latexToEquations(object) {
        if (advanceField === true || advanceField === 'true') {
            if (object.latexCmd) {
                insertTextAtCursor(object.latexValue);
            } else if (object.latex) {
                insertTextAtCursor(object.latex);
            } else {
                insertTextAtCursor(object.latexText);
            }
        } else {
            if (object.latexCmd) {
                mathField.cmd(object.latexCmd);
            } else if (object.latex) {
                mathField.write(object.latex);
            } else {
                insertTextAtCursor(object.latexText);
            }
        }
    }

    function insertTextAtCursor(text) {
        const input = document.getElementById('advInput')
        input.setRangeText(
            text,
            input.selectionStart,
            input.selectionEnd,
            'end'
        )
    }
    var modalInstance = $('.ui.modal').modal({
        closable: false,
        inverted: true

    });

    function openModel() {
        modalInstance.modal('show');
        $('#advInput').val('');
        mathField.latex('');
    }

    function closeThisDialog() {
        modalInstance.modal('hide');
    }

    function loadDataFromCkEditortoPopup(data = '') {
        openModel();
        if(!data || data == '') return;
         advanceField = data.advanced;
        latexToEquations({ 'latex': data.latex })
    }

    function loadImagetoCKEditor() {
        let latexText = $("#advInput").val();
        $("#snippet-autosave-status").addClass("busy");
        $("#snippet-autosave-status").addClass("message-block");
        $("#snippet-autosave-status_label").html("<p>Status:</p>");
        var promiseimgUrl = generateLatexToPng(latexText);
        promiseimgUrl.then(function(imgUrl) {
            let obj = {
                imgURL: imgUrl,
                latexFrmla: latexText,
                advanced: advanceField
            }
            org.ckeditor.mathtext.callbackFn(obj);
            $("#advInput").val('');
            modalInstance.modal('hide');
            $("#snippet-autosave-status").removeClass("busy");
            $("#snippet-autosave-status").removeClass("message-block");
            $("#snippet-autosave-status_label").empty();
        })

    }

    function generateLatexToPng(latexText) {
        return new Promise(function(resolve, reject) {
            var imgUrl = "";
            var errorMsg = '<div class="ui error message"><i class="close icon"></i><div class="header">There is error receving data from server. Please try again</div></div>';
            $.ajax({
                url: 'http://localhost:3001/convert',
                type: 'POST',
                data: {
                    latexInput: latexText,
                    outputFormat: 'PNG',
                    outputScale: '200%'
                },
                success: function(data) {
                    resolve(data);
                },
                error: function(e) {
                    $("#snippet-autosave-status_label").html('<p style="color:red;">Status: Error connecting to server</p>');
                    $("#snippet-autosave-status").removeClass("busy");
                }
            });
        });

    }