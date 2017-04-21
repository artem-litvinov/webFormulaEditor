var msSystem = '{';
var msCharNewLine = '\u00fe';
var msPlus = '+';
var msMinus = '-';
var msMult = '\u00b7';
var msMult2 = '\u00d7';
var msDivi = ':';
var msMetaSign = '@';
var msDegree = '\u00b0';
var msMinute = '\u00b4';
var msInvisible = '\ufb05';
var msLowReg = '_';
var msHighReg = '\\';
var msMultSign1 = '*';
var msMultSign2 = '\u0095';
var msBigAlpha = '\u0391';
var msBigBetta = '\u0392';
var msBigGamma = '\u0393';
var msBigDelta = '\u0394';
var msBigEpsilon = '\u0395';
var msBigDZeta = '\u0396';
var msBigEta = '\u0397';
var msBigTeta = '\u0398';
var msBigIota = '\u0399';
var msBigKappa = '\u039a';
var msBigLambda = '\u039b';
var msBigMu = '\u039c';
var msBigNu = '\u039d';
var msBigKsi = '\u039e';
var msBigOmicron = '\u039f';
var msBigPi = '\u03a0';
var msBigRo = '\u03a1';
var msBigSigma = '\u03a3';
var msBigTau = '\u03a4';
var msBigYpsilon = '\u03a5';
var msBigFi = '\u03a6';
var msBigHi = '\u03a7';
var msBigPsi = '\u03a8';
var msBigOmega = '\u03a9';
var msAlpha = '\u03b1';
var msBetta = '\u03b2';
var msGamma = '\u03b3';
var msDelta = '\u03b4';
var msEpsilon = '\u03b5';
var msDZeta = '\u03b6';
var msEta = '\u03b7';
var msTeta = '\u03b8';
var msIota = '\u03b9';
var msKappa = '\u03ba';
var msLambda = '\u03bb';
var msMu = '\u03bc';
var msNu = '\u03bd';
var msKsi = '\u03be';
var msOmicron = '\u03bf';
var msPi = '\u03c0';
var msRo = '\u03c1';
var msSigmaX = '\u03c2';
var msSigma = '\u03c3';
var msTau = '\u03c4';
var msYpsilon = '\u03c5';
var msFi = '\u03c6';
var msHi = '\u03c7';
var msPsi = '\u03c8';
var msOmega = '\u03c9';
var msBird = '\u2222';
var msApprox = '\u2248';
var msRound = '\u223c';
var msAround = '\u2245';
var msParallel = '\u2225';
var msNotequal = '\u2260';
var msIdentity = '\u2261';
var msMinequal = '\u2264';
var msMaxequal = '\u2265';
var msPlusMinus = '\u00b1';
var msMinusPlus = '\u2213';
var msCross = '\u22a5';
var msTriangle = '\u25b3';
var ms3Points = '\u2026';
var msAddition = '\u2208';
var msInfinity = '\u221e';
var msImUnit = '\u2139';
var msCConjugation = 'z\u0305';
var msMean = '\u0305';
var msArrowToRight = '\u2192';
var msDoubleArrow = '\u2194';
var msIntersection = '\u2229';
var msStrictInclusion = '\u2282';
var msUnstrictInclusion = '\u2286';
var msGenQuantifier = '\u2200';
var msExQuantifier = '\u2203';
var msArrowsUp = '\u21c8';
var msArrowsUpDown = '\u21c5';
var msNotBelong = '\u2209';
var msIntegral = '\u222b';
var msUnion = '\u222a';
var msEmptySign = '\u2317';

function charToTex(Ch) {
    switch (Ch) {
        case msAlpha:
            return "\\alpha";
        case msBetta:
            return "\\beta";
        case msGamma:
            return "\\gamma";
        case msDelta:
            return "\\delta";
        case msFi:
            return "\\phi";
        case msEpsilon:
            return "\\epsilon";
        case msEta:
            return "\\etha";
        case msTeta:
            return "\\theta";
        case msRo:
            return "\\rho";
        case msOmega:
            return "\\omega";
        case msBigOmega:
            return "\\Omega";
        case msPsi:
            return "\\psi";
        case msPi:
            return "\\pi";
        case msDegree:
            return "\\deg";
        case msMinute:
            return "\\min";
        case msImUnit:
            return "\\Im";
        case msRound:
            return "\\round";
        case msAround:
            return "\\around";
        case msMinequal:
            return "\\leq";
        case msMaxequal:
            return "\\geq";
        case msInfinity:
            return "\\infty";
        case msParallel:
            return "\\parallel";
        case msCross:
            return "\\perp";
        case msAddition:
            return "\\in";
        case msNotequal:
            return "\\neq";
        case msPlusMinus:
            return "\\pm";
        case msMinusPlus:
            return "\\mp";
        case ms3Points:
            return "\\ldots";
        case msTriangle:
            return "\\triangle";
        case msBird:
            return "\\bird";
        default:
            return Ch
    }
}

var StepString = 8;

function isdigit(c) {
    return c >= '0' && c <= '9';
}

function isalpha(c) {
    return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z');
}

function _operation(c) {
    var Symbols = new Set([msMultSign1, msMultSign2, '/', '^', '+', '-', ':', '|', '!', msPlusMinus, msMinusPlus, '~', '%']);
    return Symbols.has(c);
}

function _relation(c) {
    var Symbols = new Set([msNotequal, msMinequal, msAround, msParallel, '=', '>', '<', msMaxequal, msRound, msCross, msAddition]);
    return Symbols.has(c);
}

function IsNoHebrew(c) {
    return isdigit(c) || isalpha(c) || _operation(c) || _relation(c) || c == msInfinity;
}

function _litera(C) {
    var Symbols = new Set([msMean, msGenQuantifier, msExQuantifier, msHighReg, msBird, msTriangle, ms3Points]);
    return isalpha(C) || C >= msBigAlpha && C <= msBigOmega || C >= msAlpha && C <= msOmega || Symbols.has(C);
}

function _bracket(C) {
    var Symbols = new Set(['(', ')', '[', ']', '{', '}', '`', '\'', '"']);
    return Symbols.has(C);
}

function _separator(C) {
    var Symbols = new Set([',', ';', '?', '!']);
    return Symbols.has(C);
}

function _printable(C) {
    var S = new Set([' ', '.', msMetaSign, msCharNewLine]);
    return _litera(C) || C == msInfinity || isdigit(C) || _operation(C) || _relation(C) || _bracket(C) || _separator(C) || S.has(C);
}

function Font(Name, Size, Style, Weight, Color) {
    //  this.Name = Name || "Cambria Math";
    this.Name = Name || "Cambria Math";
    this.Size = Size || 14;
    this.Style = Style || "normal";
    this.Weight = Weight || "600";
    this.Color = Color || "black";
}

Font.prototype.Eq = function (F) {
    return this.Size == F.Size && this.Name == F.Name;
}
Font.prototype.Copy = function (F) {
    F.Size = this.Size;
    F.Name = this.Name;
}
Font.prototype.Clone = function () {
    var NewFont = new Font;
    NewFont.Name = this.Name;
    NewFont.Size = this.Size;
    NewFont.Style = this.Style;
    NewFont.Weight = this.Weight;
    NewFont.Color = this.Color;
    return NewFont;
}

function Pen(Width, Color, LineDash, DashOffset) {
    this.Width = Width || 1;
    this.LineDash = LineDash;
    this.DashOffset = DashOffset;
    this.Color = Color || "black";
}

var Canvas = {
    BrushColor: 0xFFFFFF,
    Font: new Font,
    AssFont: function () {
        this.Context.font = this.Font.Style + ' ' + this.Font.Weight + ' ' + this.Font.Size + 'px ' + this.Font.Name;
        this.Context.fillStyle = this.Font.Color;
    },
    SetFont: function (Font) {
        this.Font = Font;
        this.AssFont();
    },
    SetPen: function (Pen) {
        this.Context.lineWidth = Pen.Width;
        this.Context.strokeStyle = Pen.Color;
        this.Context.DashOffset = Pen.DashOffset;
        this.Context.LineDash = Pen.LineDash;
    },
    GetPen: function () {
        return new Pen(this.Context.lineWidth, this.Context.strokeStyle, this.Context.LineDash, this.Context.DashOffset);
    },
    Create: function () {
        this.Context = BaseCanvas.getContext('2d');
        this.Context.textBaseline = "top";
        this.AssFont();
        this.SetPen(new Pen);
        this.Context.imageSmoothingEnabled = false;
    },
    SetFontSize: function (Size) {
        this.Font.Size = Size;
        this.AssFont();
    },
    SetFontColor: function (Color) {
        this.Font.Color = Color;
        this.Context.fillStyle = Color;
    },
    SetLineWidth: function (Width) {
        this.Context.lineWidth = Width;
    },
    SetCompositionMode: function (CompMode) {
        this.Context.globalCompositeOperation = CompMode;
    },
    LineWidth: function () {
        return this.Context.lineWidth;
    },
    TextWidth: function (Text) {
        return Math.round(this.Context.measureText(Text).width) + 1;
    },
    SaveState: function () {
        this.Context.save();
    },
    RestoreState: function () {
        this.Context.restore();
    },
    TextMetrics: {
        Top: 0,
        Bottom: 0,
        Width: 0
    },
    GetTextMetrics: function (Text) {
        var Width = this.TextWidth(Text) + 1;
        var Height = BaseCanvas.height;
        var Excess = Math.round(this.Font.Size * 0.2);
        var MaxSize = this.Font.Size + Excess;
        this.Context.fillText(Text, 0, Height - this.Font.Size);
        var Idata = this.Context.getImageData(0, Height - MaxSize, Width, MaxSize);
        var Data = Idata.data;
        this.Context.clearRect(0, Height - MaxSize, Width, MaxSize);
        var Top = Excess,
            Bottom, Col;
        for (Col = 0; Col < Width && !Data[Top * Width * 4 + Col * 4 + 3]; Col++);
        if (Col < Width) {
            for (; Top >= 0; Top--) {
                for (Col = 0; Col < Width && !Data[Top * Width * 4 + Col * 4 + 3]; Col++);
                if (Col == Width) break;
                if (Top == -1) Top = 0;
            }
        } else {
            for (; Top < MaxSize; Top++) {
                for (Col = 0; Col < Width && !Data[Top * Width * 4 + Col * 4 + 3]; Col++);
                if (Col < Width) break;
            }
        }
        for (Bottom = MaxSize; Bottom > Top; Bottom--) {
            for (Col = 0; Col < Width && !Data[Bottom * Width * 4 + Col * 4 + 3]; Col++);
            if (Col < Width) break;
        }
        this.TextMetrics.Top = Top - Excess;
        this.TextMetrics.Bottom = Bottom - Excess;
        this.TextMetrics.Width = Width;
        return this.TextMetrics;
    },
    drawText: function (X, Y, UText) {
        if (this.BrushColor !== 0xFFFFFF) {
            this.Context.fillStyle = this.BrushColor;
            this.Context.fillRect(X, Y, this.TextWidth(UText), this.Font.Size);
            this.Context.fillStyle = this.Font.Color;
        }
        this.Context.fillText(UText, X, Y);
    },
    drawLine: function (X1, Y1, X2, Y2) {
        if (this.BrushColor !== 0xFFFFFF) {
            this.Context.fillStyle = this.BrushColor;
            this.Context.fillRect(X1, Y1, X2, Y2);
            this.Context.fillStyle = this.Font.Color;
        }
        this.Context.beginPath();
        this.Context.moveTo(X1, Y1);
        this.Context.lineTo(X2, Y2);
        this.Context.stroke();
    },
    Clear: function () {
        this.Context.clearRect(0, 0, BaseCanvas.width, BaseCanvas.height);
    }
}

function TPoint(x, y) {
    this.X = x;
    this.Y = y;
}

TPoint.prototype.Clone = function () {
    return new TPoint(this.X, this.Y);
}

function QSize(w, h) {
    this.height = h;
    this.width = w;
}

QSize.prototype.Copy = function (S) {
    S.height = this.height;
    S.width = this.width;
}

function ToUnicode(Text) {
    return Text;
}

function QRect(x1, y1, x2, y2) {
    this.left = x1;
    this.top = y1;
    this.right = x2;
    this.bottom = y2;
    this.eq = function (R) {
        return this.left == R.left && this.right == R.right && this.top == R.top && this.bottom == R.bottom;
    }
}

QRect.prototype.contains = function (p, proper) {
    proper = proper || false;
    var l, r;
    if (right < left - 1) {
        l = right;
        r = left;
    } else {
        l = left;
        r = right;
    }
    if (proper) {
        if (p.x <= l || p.x >= r)
            return false;
    } else {
        if (p.x < l || p.x > r)
            return false;
    }
    var t, b;
    if (bottom < top - 1) {
        t = bottom;
        b = top;
    } else {
        t = top;
        b = bottom;
    }
    if (proper) {
        if (p.y <= t || p.y >= b)
            return false;
    } else {
        if (p.y < t || p.y > b)
            return false;
    }
    return true;
}

var Cursor = {
    DefaultThickness: 2,
    DefaultStepTime: 500,
    MinStepTime: 50,
    MaxStepTime: 2000,
    DefaultSize: 16,
    CursorOn: false,
    CursorBlOn: false,
    Changing: false,
    CanPaint: true,
    Blink: false,
    Timer: -1,
    PaintMode: "source-over",

    Create: function (Rect) {
        this.StepTime = this.DefaultStepTime;
        this.ClipRect = Rect;
        this.Thickness = this.DefaultThickness;
        this.Pos = new TPoint(0, 0);
        this.Size = this.DefaultSize;
    },

    Paint: function () {
        if (!this.CanPaint || this.Pos.X < this.ClipRect.left || this.Pos.X > this.ClipRect.right) return false;
        this.CanPaint = false;
        var cTop = this.Pos.Y;
        if (cTop < this.ClipRect.top)
            cTop = this.ClipRect.top;
        var cBottom = this.Pos.Y + this.Size;
        if (cBottom > this.ClipRect.bottom)
            cBottom = this.ClipRect.bottom;
        if (cTop > cBottom) return false;
        Canvas.SaveState();
        Canvas.SetLineWidth(this.Thickness);
        Canvas.SetCompositionMode(this.PaintMode);
        var PosX = this.Pos.X;
        Canvas.drawLine(PosX, cTop, PosX, cBottom);
        Canvas.RestoreState();
        this.CanPaint = true;
        return true;
    },

    Erase: function () {
        if (!this.CursorBlOn) return;
        this.PaintMode = "xor";
        var Result = this.Paint();
        this.PaintMode = "source-over";
        return Result;
    },

    Show: function () {
        if (this.CursorOn) return;
        this.CursorOn = true;
        this.CursorBlOn = false;
        this.Timer = window.setInterval(Cursor.CursorBlink, this.StepTime);
    },

    Hide: function () {
        if (!this.CursorOn) return;
        this.CursorOn = false;
        this.Erase();
        this.CursorBlOn = false;
        window.clearInterval(this.Timer);
    },

    Blink: function () {
        if (!this.CursorOn || this.Changing) return;
        var Changed;
        if (this.CursorBlOn)
            Changed = this.Erase();
        else
            Changed = this.Paint();
        this.CursorBlOn = this.CursorBlOn ^ Changed;
    },

    Move: function (NewPos, NewSize) {
        if (NewPos.X == this.Pos.X && NewPos.Y == this.Pos.Y && NewSize == this.Size) return;
        this.Changing = true;
        if (this.CursorBlOn) this.Erase();
        this.Pos = NewPos;
        this.Size = NewSize;
        if (this.CursorOn)
            this.CursorBlOn = this.Paint();
        this.Changing = false;
    },

    GetThickness: function () {
        return Canvas.LineWidth();
    },
    SetThickness: function (Value) {
        if (Value == this.Thickness) return;
        this.Changing = true;
        if (this.CursorBlOn) this.Erase();
        this.Thickness = Value;
        if (this.CursorBlOn) this.CursorBlOn = this.Paint();
        this.Changing = false;
    },

    SetStepTime: function (Value) {
        if (Value < this.MinStepTime) Value = this.MinStepTime;
        if (Value > this.MaxStepTime) Value = this.MaxStepTime;
        if (Value == this.StepTime) return;
        this.StepTime = Value;
        if (this.Timer == -1) return;
        window.clearInterval(this.Timer);
        this.Timer = window.setInterval(Cursor.CursorBlink, this.StepTime);
    },

    SetClipRect: function (Value) {
        if (this.ClipRect.eq(Value)) return;
        if (Value.right < Value.left) Value.riht = Value.left;
        if (Value.bottom < Value.top) Value.bottom = Value.top;
        this.Changing = true;
        if (this.CursorBlOn) this.Erase();
        this.ClipRect = Value;
        if (this.CursorBlOn) this.CursorBlOn = this.Paint();
        this.Changing = false;
    },

    SetVisible: function (Value) {
        if (Value == this.CursorOn) return;
        if (Value)
            this.Show();
        else
            this.Hide();
    },

    GetPosX: function () {
        return this.Pos.X;
    },
    SetPosX: function (Value) {
        this.Move(new TPoint(Value, this.Pos.Y), this.Size);
    },
    GetPosY: function () {
        return this.Pos.Y;
    },
    SetPosY: function (Value) {
        Move(new TPoint(this.Pos.X, Value), this.Size);
    },
    SetSize: function (Value) {
        Move(this.Pos, Value);
    }
}

Cursor.CursorBlink = function () {
    Cursor.Blink();
}

function QSize(w, h) {
    this.height = h;
    this.width = w;
}

TLanguages = {
    Hebrew: 0,
    English: 1
}
EdAction = {
    edNone: 0,
    edCursor: 1,
    edRefresh: 2,
    edBeep: 3,
    edInvalid: 4
};
TEdAction = {
    actPrintable: 0,
    actCtrlKey: 1,
    actIcon: 2,
    actMouseButton: 3,
    actNone: 4,
    actStep: 5
};

function U_A_T(Parm) {
    this.Parms = Parm;
    switch (typeof Parm) {
        case 'string':
            if (Parm.length == 1 || Parm == msCConjugation)
                this.act = TEdAction.actPrintable;
            else
                this.act = TEdAction.actCtrlKey;
            return;
        case 'object':
            this.act = TEdAction.actMouseButton;
            return;
    }
    this.act = TEdAction.actNone;
}

U_A_T.prototype.eq = function (UAT) {
    return this.Parms == UAT.Parms;
}

function EditSets(MainFont, PowrFont, IndxFont, BkgrColor, SignColor, CursColor) {
    this.MainFont = MainFont;
    this.PowrFont = PowrFont;
    this.IndxFont = IndxFont;
    this.BkgrColor = BkgrColor;
    this.SignColor = SignColor;
    this.CursColor = CursColor;
}

function TXPGrEl() {
    this.Size = new QSize(0, 0);
    this.Axis = {
        x: 0
    };
    this.Start = new TPoint(0, 0);
}

TXPGrEl.Language = TLanguages.English;
TXPGrEl.EditKeyPress = false;
TXPGrEl.ShowMultSign = false;

function XPInEdit(P, AEditSets) {
    TXPGrEl.call(this);
    this.Active = true;
    this.EditSets = AEditSets;
    this.Visible = true;
    this.RecalcSpaces = false;
    this.IsInterval = false;
    this.IndReg = 0;
    this.Start = P;
    this.pL = new EdList(this);
    this.pL.Start = P.Clone();
    this.pL.pSub_L = this.pL;
    this.pWForMeasure = new EdChar('W', this);
    this.pWForMeasure.Permanent = true;
    this.pCurrentTable = null;
    this.pPaintedElement = null;
}

XPInEdit.prototype = Object.create(TXPGrEl.prototype);

XPInEdit.prototype.SavePaintState = function () {
    this.Pen = Canvas.GetPen();
    this.OldFontColor = Canvas.Font.Color;
    this.OldBrushColor = Canvas.BrushColor;
    this.BrushColor = Canvas.BrushColor;
}

XPInEdit.prototype.SetPaintState = function () {
    Canvas.SetPen(this.Pen);
    Canvas.SetFontColor(this.Pen.Color);
    Canvas.BrushColor = this.BrushColor;
}

XPInEdit.prototype.SetPaintColors = function (PenColor, BrushColor) {
    this.Pen.Color = PenColor;
    this.BrushColor = BrushColor;
    this.SetPaintState();
}

XPInEdit.prototype.RestorePaintState = function () {
    this.Pen.Color = this.OldFontColor;
    this.BrushColor = this.OldBrushColor;
    this.SetPaintState();
}

XPInEdit.prototype.FreeContents = function () {
    delete this.pL;
}

XPInEdit.prototype.TextWidth = function (Text) {
    return Canvas.TextWidth(Text);
}

XPInEdit.prototype.TextHeight = function () {
    var Metrix = Canvas.GetTextMetrics();
    return Metrix.Bottom - Metrix.Top + 1;
}

XPInEdit.prototype.SetPowerSize = function (x, allow) {
    if (!allow) return;
    if (x == 0)
        this.DrawingPower = 0;
    else
        this.DrawingPower += x;
    if (this.DrawingPower == 0)
        Canvas.SetFont(this.EditSets.MainFont);
    if (this.DrawingPower > 0)
        Canvas.SetFont(this.EditSets.PowrFont);
    if (this.DrawingPower < 0)
        Canvas.SetFont(this.EditSets.IndxFont);
}

XPInEdit.prototype.SetRegSize = function (ind) {
    if (this.DrawingPower > 0) {
        Canvas.SetFont(this.EditSets.PowrFont);
        return;
    }
    if (this.DrawingPower < 0) {
        Canvas.SetFont(this.EditSets.IndxFont);
        return;
    }
    Canvas.SetFont(this.EditSets.MainFont);
    if (ind == 0 || ind == 2) return;
    if (ind > 0)
        Canvas.SetFont(this.EditSets.PowrFont);
    else
        Canvas.SetFont(this.EditSets.IndxFont);
}

XPInEdit.prototype.SetEditSets = function (Value) {
    this.EditSets = Value;
}

XPInEdit.prototype.TextOut = function (X, Y, Text) {
    var UText = ToUnicode(Text);
    if (this.pPaintedElement === null || !this.pPaintedElement.Selected) {
        Canvas.drawText(X, Y, UText);
        return;
    }
    SavePaintState();
    SetPaintColors(0xffffff, 0);
    Canvas.drawText(X, Y, UText);
    RestorePaintState();
}

XPInEdit.prototype.Line = function (X1, Y1, X2, Y2) {
    if (this.pPaintedElement !== null && this.pPaintedElement.Selected) {
        SavePaintState();
        SetPaintColors(0xffffff, 0);
        Canvas.drawLine(X1, Y1, X2, Y2);
        RestorePaintState();
    } else
        Canvas.drawLine(X1, Y1, X2, Y2);
}

XPInEdit.prototype.SetRegister = function (SymReg) {
    this.IndReg = SymReg;
}

XPInEdit.prototype.GetCurrentList = function () {
    return this.pL.pSub_L;
}

XPInEdit.prototype.SetCurrentList = function (pList) {
    this.pL.pSub_L = pList;
}

XPInEdit.prototype.TypeConvert = function (Type) {
    return Type == this.pL.pSub_L.pMother.pMember.Type ? this.pL.pSub_L.pMother.pMember : null;
}

XPInEdit.prototype.GetCursorPosition = function () {
    var LSub_L = this.pL.pSub_L;
    var Result = new TPoint(0, 0);
    if (LSub_L.pCurr !== null) {
        Result.X = LSub_L.Curr_positionX();
        Result.Y = LSub_L.Curr_positionY();
        return Result;
    }
    var SizeY = {
        x: 0
    };
    var X = {
        x: 0
    };
    var Y = {
        x: 0
    };
    this.ConditCalcCursorMeasures(X, Y, SizeY);
    Result.X = X.x;
    Result.Y = Y.x;

    if (this.pL.pSub_L.pMother !== null) {
        if (this.TypeConvert('EdFrac') !== null && this.pL.pSub_L.pFirst !== null)
            Result.X = this.pL.pSub_L.Curr_positionX();

        var pElIntegr = this.TypeConvert('EdDfIntegr');
        if (pElIntegr !== null && (this.pL.pSub_L == pElIntegr.pLL || this.pL.pSub_L == pElIntegr.pHL) && this.pL.pSub_L.pFirst !== null)
            Result.X = this.pL.pSub_L.Curr_positionX();

        var pElGSumm = this.TypeConvert('EdGSumm');
        if (pElGSumm !== null && (this.pL.pSub_L == pElGSumm.pLL || this.pL.pSub_L == pElGSumm.pHL) && this.pL.pSub_L.pFirst !== null)
            Result.X = this.pL.pSub_L.Curr_positionX();

        var ElLimit = this.TypeConvert('EdLimit');
        if (ElLimit !== null && (this.pL.pSub_L == ElLimit.pVL || this.pL.pSub_L == ElLimit.pEE) && this.pL.pSub_L.pFirst !== null)
            Result.X = this.pL.pSub_L.Curr_positionX();

        var ElMeas = this.TypeConvert('EdMeas');
        if (ElMeas !== null && ElMeas.DegMin && this.pL.pSub_L == ElMeas.pBB)
            Result.X = this.pL.pSub_L.Curr_positionX();
    }
    return Result;
}

XPInEdit.prototype.GetCursorSize = function () {
    var Result = this.pL.pSub_L.Curr_SizeY();
    if (this.pL.pSub_L.pCurr === null) {
        var X = {
                x: 0
            },
            Y = {
                x: 0
            },
            SizeY = {
                x: 0
            };
        this.ConditCalcCursorMeasures(X, Y, SizeY);
        Result = SizeY.x;
    }
    if (Result != 0) return Result;
    return this.TextHeight("W(|?[01");
}

XPInEdit.prototype.ConditCalcCursorMeasures = function (X, Y, SizeY) {
    if (TXPGrEl.Language == TLanguages.Hebrew && !TXPGrEl.EditKeyPress) {
        X.x = this.pL.pSub_L.Curr_positionX();
        Y.x = this.pL.pSub_L.Curr_positionY();
        SizeY.x = this.pL.pSub_L.Curr_SizeY();
        return;
    }
    var bActive = this.Active;
    var bVisible = this.Visible;
    var bFIndReg = this.IndReg;
    var bDrawingPower = this.DrawingPower;
    if (!TXPGrEl.EditKeyPress)
        this.pL.pSub_L.Append_Before(this.pWForMeasure);
    this.PreCalc(this.Start, this.Size, this.Axis);
    this.pL.pSub_L.MoveLeft(this.pL);
    X.x = this.pL.pSub_L.Curr_positionX();
    Y.x = this.pL.pSub_L.Curr_positionY();
    SizeY.x = this.pL.pSub_L.Curr_SizeY();
    if (!TXPGrEl.EditKeyPress)
        this.pL.pSub_L.NextDelete();
    this.Active = bActive;
    this.Visible = bVisible;
    this.IndReg = bFIndReg;
    this.DrawingPower = bDrawingPower;
    if (!TXPGrEl.EditKeyPress)
        this.PreCalc(this.Start, this.Size, this.Axis);
    TXPGrEl.EditKeyPress = false;
}

XPInEdit.prototype.EditAction = function (Uact) {
    var MaxVarLen = 1,
        VarLen;
    var SimpleVar = false;
    if (this.pL.pSub_L.pMother !== null) {
        var pElementI = this.TypeConvert('EdIntegr');
        if (pElementI !== null && this.pL.pSub_L == pElementI.pBB)
            SimpleVar = true;
        if (this.TypeConvert('EdVect') !== null) {
            SimpleVar = true;
            MaxVarLen = 2;
        }
    }
    if (Uact.act == TEdAction.actPrintable) // { create & append text`s element }
    {
        var AllowedChar = this.pL.pSub_L.pMother === null || Uact.Parms != ';' && Uact.Parms != msCharNewLine;

        if (this.pL.pSub_L.pMother !== null &&
            this.TypeConvert('EdSyst') !== null && (Uact.Parms == ';'))
            AllowedChar = true;

        if (SimpleVar) {
            VarLen = 0;
            var pElementM = this.pL.pSub_L.pFirst;
            while (pElementM !== null) {
                VarLen++;
                pElementM = pElementM.pNext;
            }
            if (VarLen >= MaxVarLen)
                AllowedChar = false;
        }

        if (AllowedChar) {
            this.pL.pSub_L.Append_Before(new EdChar(Uact.Parms, this));
            return EdAction.edRefresh;
        }
        return EdAction.edNone;
    }
    if (Uact.act == TEdAction.actCtrlKey) {
        if (Uact.Parms == "vk_Back") {
            this.pL.pSub_L.PrevDelete();
            return EdAction.edRefresh;
        }
        if (Uact.Parms == "vk_Delete") {
            this.pL.pSub_L.NextDelete();
            return EdAction.edRefresh;
        }
        if (Uact.Parms == "vk_Up") {
            this.pL.pSub_L.MoveUp(this.pL);
            return EdAction.edCursor;
        }
        if (Uact.Parms == "vk_Down") {
            this.pL.pSub_L.MoveDown(this.pL);
            return EdAction.edCursor;
        }
        if (Uact.Parms == "vk_Left") {
            this.pL.pSub_L.MoveLeft(this.pL);
            return EdAction.edCursor;
        }
        if (Uact.Parms == "vk_Right") {
            this.pL.pSub_L.MoveRight(this.pL);
            return EdAction.edCursor;
        }
        if (SimpleVar) return EdAction.edBeep;
    }

    var pElement, pAppending, pElementLg, pElementA, pElementI, pElementL;
    if (Uact.Parms == "ROOT") //IF Uact.k = 'ROOT' then {
    {
        pElement = new EdRoot(this); //element := TEdRoot.Create( Self );
        pAppending = this.pL.pSub_L.Append_Before(pElement); //appending := L.Sub_L.append_Before( element );
        pElement.pAA.pMother = pAppending; // element.AA.mother := appending;
        pElement.pBB.pMother = pAppending; //element.BB.mother := appending;
        this.pL.pSub_L = pElement.pBB; //L.Sub_L := element.BB;
        return EdAction.edRefresh; //EditAction := edRefresh;
    }

    if (Uact.Parms == "SQROOT") //IF Uact.k = 'SQROOT' then {
    {
        pElement = new EdSqRoot(this); //element := TEdSqRoot.Create( Self );
        pAppending = this.pL.pSub_L.Append_Before(pElement); //appending := L.Sub_L.append_Before( element );
        pElement.pAA.pMother = pAppending; // element.AA.mother := appending;
        pElement.pBB.pMother = pAppending; //element.BB.mother := appending;
        this.pL.pSub_L = pElement.pAA; //L.Sub_L := element.AA;
        return EdAction.edRefresh; //EditAction := edRefresh;
    }

    if (Uact == "ABS") //else IF Uact.k = 'ABS' then {
    {
        pElementA = new EdAbs(this); //elementA := TEdAbs.Create( Self );
        pAppending = this.pL.pSub_L.Append_Before(pElementA); //appending := L.Sub_L.append_Before( elementA );
        pElementA.pAA.pMother = pAppending; //elementA.AA.mother := appending;
        this.pL.pSub_L = pElementA.pAA; //L.Sub_L := elementA.AA;
        return EdAction.edRefresh; //EditAction := edRefresh;
    }

    if (Uact.Parms == "FRACTION") //else IF Uact.k = 'FRACTION' then
    {
        pElement = new EdFrac(this); //element := TEdFrac.Create( Self );
        pAppending = this.pL.pSub_L.Append_Before(pElement); //appending := L.Sub_L.append_Before( element );
        pElement.pAA.pMother = pAppending; //element.AA.mother := appending;
        pElement.pBB.pMother = pAppending; //element.BB.mother := appending;
        this.pL.pSub_L = pElement.pAA; //L.Sub_L := elementA.AA;
        return EdAction.edRefresh; //EditAction := edRefresh;
    }

    if (Uact.Parms == "INTEGRAL") {
        pElementI = new EdIntegr(this);
        pAppending = this.pL.pSub_L.Append_Before(pElementI);
        pElementI.pAA.pMother = pAppending;
        pElementI.pBB.pMother = pAppending;
        pElementI.pDD.pMother = pAppending;
        this.pL.pSub_L = pElementI.pAA;
        if (this.Active) {
            this.pL.pSub_L.Append_Before(new EdChar('(', this));
            this.pL.pSub_L.Append_Before(new EdChar(')', this));
            this.pL.pSub_L.MoveLeft(this.pL.pSub_L);
        }
        return EdAction.edRefresh;
    }

    if (Uact.Parms == "LG") {
        pElementLg = new EdLg(this, "lg");
        pAppending = this.pL.pSub_L.Append_Before(pElementLg);
        pElementLg.pAA.pMother = pAppending;
        pElementLg.pNN.pMother = pAppending;
        this.pL.pSub_L = pElementLg.pAA;
        return EdAction.edRefresh;
    }

    if (Uact.Parms == "LN") {
        pElementLg = new EdLg(this, "ln");
        pAppending = this.pL.pSub_L.Append_Before(pElementLg);
        pElementLg.pAA.pMother = pAppending;
        pElementLg.pNN.pMother = pAppending;
        this.pL.pSub_L = pElementLg.pAA;
        return EdAction.edRefresh;
    }

    if (Uact.Parms == "POWER") {
        pElement = new EdPowr(this);
        pAppending = this.pL.pSub_L.Append_Before(pElement);
        pElement.pAA.pMother = pAppending;
        pElement.pBB.pMother = pAppending;
        this.pL.pSub_L = pElement.pAA;
        return EdAction.edRefresh;
    }

    if (Uact.Parms == "EXP") {
        pElementLg = new EdLg(this, "exp");
        pAppending = this.pL.pSub_L.Append_Before(pElementLg);
        pElementLg.pAA.pMother = pAppending;
        pElementLg.pNN.pMother = pAppending;
        this.pL.pSub_L = pElementLg.pAA;
        return EdAction.edRefresh;
    }
    if (Uact.Parms == "SIN") {
        pElementLg = new EdLg(this, "sin");
        pAppending = this.pL.pSub_L.Append_Before(pElementLg);
        pElementLg.pAA.pMother = pAppending;
        pElementLg.pNN.pMother = pAppending;
        this.pL.pSub_L = pElementLg.pAA;
        return EdAction.edRefresh;
    }
    if (Uact.Parms == "COS") {
        pElementLg = new EdLg(this, "cos");
        pAppending = this.pL.pSub_L.Append_Before(pElementLg);
        pElementLg.pAA.pMother = pAppending;
        pElementLg.pNN.pMother = pAppending;
        this.pL.pSub_L = pElementLg.pAA;
        return EdAction.edRefresh;
    }
    if (Uact.Parms == "TAN") {
        pElementLg = new EdLg(this, "tan");
        pAppending = this.pL.pSub_L.Append_Before(pElementLg);
        pElementLg.pAA.pMother = pAppending;
        pElementLg.pNN.pMother = pAppending;
        this.pL.pSub_L = pElementLg.pAA;
        return EdAction.edRefresh;
    }
    if (Uact.Parms == "COT") {
        pElementLg = new EdLg(this, "cot");
        pAppending = this.pL.pSub_L.Append_Before(pElementLg);
        pElementLg.pAA.pMother = pAppending;
        pElementLg.pNN.pMother = pAppending;
        this.pL.pSub_L = pElementLg.pAA;
        return EdAction.edRefresh;
    }
    if (Uact.Parms == "ARCSIN") {
        pElementLg = new EdLg(this, "arcsin");
        pAppending = this.pL.pSub_L.Append_Before(pElementLg);
        pElementLg.pAA.pMother = pAppending;
        pElementLg.pNN.pMother = pAppending;
        this.pL.pSub_L = pElementLg.pAA;
        return EdAction.edRefresh;
    }
    if (Uact.Parms == "ARCCOS") {
        pElementLg = new EdLg(this, "arccos");
        pAppending = this.pL.pSub_L.Append_Before(pElementLg);
        pElementLg.pAA.pMother = pAppending;
        pElementLg.pNN.pMother = pAppending;
        this.pL.pSub_L = pElementLg.pAA;
        return EdAction.edRefresh;
    }
    if (Uact.Parms == "ARCTAN") {
        pElementLg = new EdLg(this, "arctan");
        pAppending = this.pL.pSub_L.Append_Before(pElementLg);
        pElementLg.pAA.pMother = pAppending;
        pElementLg.pNN.pMother = pAppending;
        this.pL.pSub_L = pElementLg.pAA;
        return EdAction.edRefresh;
    }
    if (Uact.Parms == "ARCCOT") {
        pElementLg = new EdLg(this, "arccot");
        pAppending = this.pL.pSub_L.Append_Before(pElementLg);
        pElementLg.pAA.pMother = pAppending;
        pElementLg.pNN.pMother = pAppending;
        this.pL.pSub_L = pElementLg.pAA;
        return EdAction.edRefresh;
    }
    if (Uact.Parms == "MATRIX") {
        pElementA = new EdMatr(this);
        pElementA.IsVisible = true;
        pAppending = this.pL.pSub_L.Append_Before(pElementA);
        pElementA.pAA.pMother = pAppending;
        this.pL.pSub_L = pElementA.pAA;
        return EdAction.edRefresh;
    }
    if (Uact.Parms == "LIMIT") {
        pElementL = new EdLimit(this);
        pAppending = this.pL.pSub_L.Append_Before(pElementL);
        pElementL.pAA.pMother = pAppending;
        pElementL.pVL.pMother = pAppending;
        pElementL.pEE.pMother = pAppending;
        pElementL.pNN.pMother = pAppending;
        pElementL.pRR.pMother = pAppending;
        this.pL.pSub_L = pElementL.pAA;
        if (this.Active) {
            this.pL.pSub_L.Append_Before(new EdChar('(', this));
            this.pL.pSub_L.Append_Before(new EdChar(')', this));
            this.pL.pSub_L.MoveLeft(this.pL.pSub_L);
        }
        return EdAction.edRefresh;
    }

    if (Uact.Parms == "IMUNIT") {
        var pElementIm = new EdImUnit(this);
        pAppending = this.pL.pSub_L.Append_Before(pElementIm);
        pElementIm.pAA.pMother = pAppending;
        this.pL.pSub_L = pElementIm.pAA;
        this.pL.pSub_L.MoveRight(this.pL.pSub_L);
        return EdAction.edRefresh;
    }
    if (Uact.Parms == "DERIVATIVE") {
        var pElementD = new EdDeriv(this);
        pAppending = this.pL.pSub_L.Append_Before(pElementD);
        pElementD.pAA.pMother = pAppending;
        pElementD.pBB.pMother = pAppending;
        pElementD.pHD.pMother = pAppending;
        pElementD.pLD.pMother = pAppending;
        this.pL.pSub_L = pElementD.pAA;
        return EdAction.edRefresh;
    }

    if (Uact.Parms == "VRECTOR") {
        pElementA = new EdVect(this);
        pAppending = this.pL.pSub_L.Append_Before(pElementA);
        pElementA.pAA.pMother = pAppending;
        this.pL.pSub_L = pElementA.pAA;
        return EdAction.edRefresh;
    }

    if (Uact.Parms == "PerCount") {
        var pElementPerCount = new EdPerCount(this);
        pAppending = this.pL.pSub_L.Append_Before(pElementPerCount);
        pElementPerCount.pAA.pMother = pAppending;
        pElementPerCount.pB1.pMother = pAppending;
        pElementPerCount.pCC.pMother = pAppending;
        pElementPerCount.pB2.pMother = pAppending;
        this.pL.pSub_L = pElementPerCount.pCC;
        return EdAction.edRefresh;
    }

    if (Uact.Parms == "BinomCoeff") {
        var pElementBCoeff = new EdBCoeff(this, 'C');
        pAppending = this.pL.pSub_L.Append_Before(pElementBCoeff);
        pElementBCoeff.pAA.pMother = pAppending;
        pElementBCoeff.pBB.pMother = pAppending;
        pElementBCoeff.pCC.pMother = pAppending;
        this.pL.pSub_L = pElementBCoeff.pCC;
        return EdAction.edRefresh;
    }

    if (Uact.Parms == "ABinomCoeff") {
        var pElementBCoeff = new EdBCoeff(this, 'A');
        pAppending = this.pL.pSub_L.Append_Before(pElementBCoeff);
        pElementBCoeff.pAA.pMother = pAppending;
        pElementBCoeff.pBB.pMother = pAppending;
        pElementBCoeff.pCC.pMother = pAppending;
        this.pL.pSub_L = pElementBCoeff.pCC;
        return EdAction.edRefresh;
    }

    if (Uact.Parms == "FUNC") {
        var pElementFunc = new EdFunc(this);
        pAppending = this.pL.pSub_L.Append_Before(pElementFunc);
        pElementFunc.pAA.pMother = pAppending;
        pElementFunc.pB1.pMother = pAppending;
        pElementFunc.pBB.pMother = pAppending;
        pElementFunc.pB2.pMother = pAppending;
        this.pL.pSub_L.MoveLeft(this.pL.pSub_L);
        this.pL.pSub_L.MoveLeft(this.pL.pSub_L);
        return EdAction.edRefresh;
    }

    if (Uact.Parms == "SYSTEM") {
        pElementA = new EdSyst(this);
        pAppending = this.pL.pSub_L.Append_Before(pElementA);
        pElementA.pAA.pMother = pAppending;
        this.pL.pSub_L = pElementA.pAA;
        return EdAction.edRefresh;
    }

    if (Uact.Parms == "INDEX") {
        pElement = new EdIndx(this);
        pAppending = this.pL.pSub_L.Append_Before(pElement);
        pElement.pAA.pMother = pAppending;
        pElement.pBB.pMother = pAppending;
        this.pL.pSub_L = pElement.pAA;
        if (this.Active) {
            this.pL.pSub_L.Append_Before(new EdChar('(', this));
            this.pL.pSub_L.Append_Before(new EdChar(')', this));
            this.pL.pSub_L.MoveLeft(this.pL.pSub_L);
        }
        return EdAction.edRefresh;
    }

    if (Uact.Parms == "MEASURED") {
        var pElementR = new EdMeas(this);
        pAppending = this.pL.pSub_L.Append_Before(pElementR);
        pElementR.pAA.pMother = pAppending;
        pElementR.pBB.pMother = pAppending;
        pElementR.pOB.pMother = pAppending;
        pElementR.pCB.pMother = pAppending;
        this.pL.pSub_L = pElementR.pAA;
        if (this.Active) {
            this.pL.pSub_L.Append_Before(new EdChar('(', this));
            this.pL.pSub_L.Append_Before(new EdChar(')', this));
            this.pL.pSub_L.MoveLeft(this.pL.pSub_L);
        }
        return EdAction.edRefresh;
    }

    if (Uact.Parms == "LOG") {
        var pElementLog = new EdLog(this);
        pAppending = this.pL.pSub_L.Append_Before(pElementLog);
        pElementLog.pAA.pMother = pAppending;
        pElementLog.pBB.pMother = pAppending;
        pElementLog.pB1.pMother = pAppending;
        pElementLog.pCC.pMother = pAppending;
        pElementLog.pB2.pMother = pAppending;
        this.pL.pSub_L = pElementLog.pCC;
        return EdAction.edRefresh;
    }

    if (Uact.Parms == "DEFINTEGRAL") {
        pElementI = new EdDfIntegr(this);
        pAppending = this.pL.pSub_L.Append_Before(pElementI);
        pElementI.pAA.pMother = pAppending;
        pElementI.pBB.pMother = pAppending;
        pElementI.pLL.pMother = pAppending;
        pElementI.pHL.pMother = pAppending;
        pElementI.pDD.pMother = pAppending;
        this.pL.pSub_L = pElementI.pAA;
        if (this.Active) {
            this.pL.pSub_L.Append_Before(new EdChar('(', this));
            this.pL.pSub_L.Append_Before(new EdChar(')', this));
            this.pL.pSub_L.MoveLeft(this.pL);
        }
        return EdAction.edRefresh;
    }

    if (Uact.Parms == "GSUMMA") {
        var pElementS = new EdGSumm(this);
        pAppending = this.pL.pSub_L.Append_Before(pElementS);
        pElementS.pAA.pMother = pAppending;
        pElementS.pLL.pMother = pAppending;
        pElementS.pHL.pMother = pAppending;
        this.pL.pSub_L = pElementS.pAA;
        if (this.Active) {
            this.pL.pSub_L.Append_Before(new EdChar('(', this));
            this.pL.pSub_L.Append_Before(new EdChar(')', this));
            this.pL.pSub_L.MoveLeft(this.pL);
        }
        return EdAction.edRefresh;
    }

    if (Uact.Parms == "GMULT") {
        var pElementS = new EdGMult(this);
        pAppending = this.pL.pSub_L.Append_Before(pElementS);
        pElementS.pAA.pMother = pAppending;
        pElementS.pLL.pMother = pAppending;
        pElementS.pHL.pMother = pAppending;
        this.pL.pSub_L = pElementS.pAA;
        if (this.Active) {
            this.pL.pSub_L.Append_Before(new EdChar('(', this));
            this.pL.pSub_L.Append_Before(new EdChar(')', this));
            this.pL.pSub_L.MoveLeft(this.pL);
        }
        return EdAction.edRefresh;
    }

    if (Uact.Parms == "SUBST") {
        var pElementS = new EdSubst(this);
        pAppending = this.pL.pSub_L.Append_Before(pElementS);
        pElementS.pAA.pMother = pAppending;
        pElementS.pLL.pMother = pAppending;
        pElementS.pHL.pMother = pAppending;
        this.pL.pSub_L = pElementS.pAA;
        if (this.Active) {
            this.pL.pSub_L.Append_Before(new EdChar('(', this));
            this.pL.pSub_L.Append_Before(new EdChar(')', this));
            this.pL.pSub_L.MoveLeft(this.pL);
        }
        return EdAction.edRefresh;
    }
    if (Uact.act == TEdAction.actMouseButton) {
        this.pL.pSub_L = this.pL;
        this.pL.pCurr == null;
        var pS = {
            p: this.pL.pSub_L
        };
        var pC = {
            p: this.pL.pCurr
        };
        var Result = this.pL.pSub_L.SetCurrent(Uact.Parms, pS, pC);
        this.pL.pCurr = pC.p;
        if (Result)
            this.pL.pSub_L = pS.p;
        else
            this.pL.pSub_L = this.pL;
        return EdAction.edRefresh;
    }
    return EdAction.edNone;
}

XPInEdit.prototype.PreCalc = function (P, S, A) {
    this.Start = P.Clone();
    this.pL.PreCalc(P, this.Size, this.Axis);
    if (this.pL.Splitted())
        this.Axis.x = Math.round(this.Size.height / 2);
    this.Size.Copy(S);
    A.x = this.Axis.x;
}

XPInEdit.prototype.CalcSize = function () {
    PreCalc(this.Start, this.Size, this.Axis);
    return this.Size;
}

XPInEdit.prototype.EditDraw = function (NewStart) {
    if (arguments.length == 0) {
        this.pL.PreCalc(this.Start, this.Size, this.Axis);
        this.pL.Draw(this.Start);
        return;
    }
    this.pL.PreCalc(NewStart, this.Size, this.Axis);
    this.pL.Draw(NewStart);
}

XPInEdit.prototype.Write = function () {
    return this.pL.Write();
}

XPInEdit.prototype.UnRead = function (S) {
    var Uact = new U_A_T(S);
    this.Active = false;
    EditAction(Uact);
    this.Active = true;
}

XPInEdit.prototype.Clear = function () {
    FreeContents();
    this.pL = new EdList(this);
    this.pL.Start = this.Start;
    this.pL.pSub_L = this.pL;
}

XPInEdit.prototype.SetVisible = function (Visib) {
    this.Visible = Visib;
}

XPInEdit.prototype.AddElement = function (pSpacer) {
    this.pL.pSub_L.Append_Before(pSpacer);
}

XPInEdit.prototype.GlobalSetCurrent = function (x, y) {
    return this.pL.SetCurrent(new TPoint(x, y), {}, {});
}

XPInEdit.prototype.GetFragment = function () {
    var Result;
    var pMemb = this.pL.pFirst;
    while (pMemb !== null) {
        Result += pMemb.pMember.GetFragment();
        pMemb = pMemb.pNext;
    }
    return Result;
}

XPInEdit.prototype.SelectFragment = function (FRect) {
    var pMemb = this.pL.pFirst;
    while (pMemb !== null) {
        pMemb.pMember.SelectFragment(FRect);
        pMemb = pMemb.pNext;
    }
}

XPInEdit.prototype.ClearSelection = function () {
    var pMemb = this.pL.pFirst;
    while (pMemb !== null) {
        pMemb.pMember.ClearSelection();
        pMemb = pMemb.pNext;
    }
}

XPInEdit.prototype.GetRect = function () {
    return QRect(this.Start.X, this.Start.Y, this.Size.width, this.Size.height);
}

XPInEdit.prototype.SWrite = function () {
    return this.pL.SWrite();
}

XPInEdit.prototype.SizeEmptySign = function (Size, Axis) {
    var Metrics = Canvas.GetTextMetrics(msEmptySign);
    Size.width = Metrics.Width;
    Size.height = Canvas.Font.Size - Metrics.Top;
    Axis.x = Math.round(Size.height / 2);
}

XPInEdit.prototype.DrawAsEmptySign = function (pEl) {
    if (pEl.Size.height == 0) return;
    var EmptySign = new EdChar(msEmptySign, this);
    EmptySign.Start = pEl.Start;
    EmptySign.Size = pEl.Size;
    EmptySign.Axis = pEl.Axis;
    EmptySign.Draw(pEl.Start);
}

function EdElm(pOwn) {
    TXPGrEl.call(this);
    this.pOwner = pOwn;
    this.Permanent = false;
    this.Selected = false;
}

EdElm.prototype = Object.create(TXPGrEl.prototype);

EdElm.prototype.SetCurrent = function (C, pSL, pCr) {
    return true;
}

EdElm.prototype.ParentCalc = function (pNext) {
    return pNext;
}

EdElm.prototype.GetFragment = function () {
    if (this.Selected) return this.Write() + '&';
    return "";
}

EdElm.prototype.SelectFragment = function (FRect) {
    this.Selected = InRect(FRect);
}

EdElm.prototype.ClearSelection = function () {
    this.Selected = false;
}

EdElm.prototype.InRect = function (FRect) {
    return FRect.contains(this.Start.X, this.Start.Y) ||
        FRect.contains(this.Start.X, this.Start.Y + this.Size.height) ||
        FRect.contains(this.Start.X + this.Size.width, this.Start.Y) ||
        FRect.contains(this.Start.X + this.Size.width, this.Start.Y + this.Size.height);
}

EdElm.prototype.MoveInRight = function (pL) {
    return false;
}

EdElm.prototype.MoveInLeft = function (pL) {
    return false;
}

EdElm.prototype.MoveToNext = function (pL) {
    return false;
}

EdElm.prototype.MoveToPrev = function (pL) {
    return false;
}

EdElm.prototype.MoveToUp = function (pL) {
    return false;
}

EdElm.prototype.MoveToDown = function (pL) {
    return false;
}

EdElm.prototype.StrSeparat = function () {
    return false;
}

EdElm.prototype.ElChar = function (C) {
    return false;
}

EdElm.prototype.SWrite = function () {
    return this.Write();
}

function EdMemb(pE, pP, pN, pEL) {
    EdElm.call(this, pEL.pOwner);
    this.pMother = pEL;
    this.pMember = pE;
    this.pPrev = pP;
    this.pNext = pN;
    this.Start = pE.Start;
}

EdMemb.prototype = Object.create(EdElm.prototype);

EdMemb.prototype.PreCalc = function (P, S, A) {
    this.Start = P.Clone();
    this.pMember.PreCalc(this.Start, this.Size, this.Axis);
    this.Size.Copy(S);
    A.x = this.Axis.x;
}

EdMemb.prototype.ParentCalc = function (pNext) {
    if (!this.pMember.ElChar({})) return this.pNext;
    this.pMember.Start = this.Start;
    var pResult = this.pMember.ParentCalc(this.pNext);
    this.Start = this.pMember.Start;
    this.Size = this.pMember.Size;
    this.Axis = this.pMember.Axis;
    return pResult;
}

EdMemb.prototype.Draw = function (P) {
    if (this.Start.X != P.X || this.Start.Y != P.Y) {
        this.Start = P.Clone();
        PreCalc(this.Start, this.Size, this.Axis);
    }
    this.pMember.Draw(P);
}

EdMemb.prototype.Write = function () {
    return this.pMember.Write();
}

EdMemb.prototype.StrSeparat = function () {
    return this.pMember.StrSeparat();
}

EdMemb.prototype.ElChar = function (C) {
    return this.pMember.ElChar(C);
}

function EdList(pOwn) {
    EdElm.call(this, pOwn);
    this.Primary = true;
    this.ReCalc = false;
    this.IsCell = false;
    this.Hebrew = false;
    this.pMother = null;
    this.pFirst = null;
    this.pLast = null;
    this.pCurr = null;
    this.pSub_L = null;
    this.pFirstInLine = null;
    this.PrevSize = new QSize(0, 0);
    this.PrevAxis = {
        x: 0
    };
}

EdList.prototype = Object.create(EdElm.prototype);

EdList.prototype.SetCurrent = function (C, pSL, pCr) {
    pCr.p = null;
    for (var pIndex = this.pFirst; pIndex !== null; pIndex = pIndex.pNext)
        if (pIndex.Start.X <= C.X &&
            pIndex.Start.X + pIndex.Size.width >= C.X &&
            pIndex.Start.Y <= C.Y &&
            pIndex.Start.Y + pIndex.Size.height >= C.Y) {
            pCr.p = pIndex;
            return pIndex.pMember.SetCurrent(C, pSL, pCr);
        }
    return false;
}

EdList.prototype.TailSize = function () {
    this.Start = this.pFirst.Start;
    this.Size.height = 0;
    this.Size.width = 0;
    for (var pIndex = this.pFirst; pIndex !== null; pIndex = pIndex.pNext) {
        this.Size.width = Math.max(this.Size.width, pIndex.Start.X + pIndex.Size.width - this.Start.X);
        this.Size.height = Math.max(this.Size.height, pIndex.Start.Y + pIndex.Size.height - this.Start.Y);
        if (pIndex.pNext === null && pIndex.StrSeparat())
            this.Size.height = (Math.max(this.Size.height, pIndex.Start.Y + pIndex.Size.height +
                pIndex.Size.height + StepString - this.Start.Y));
    }
}

EdList.prototype.ParentCalc = function (pNext) {
    for (var pIndex = this.pFirst; pIndex !== null; pIndex = pIndex.ParentCalc(pIndex.pNext));
    return pNext;
}

EdList.prototype.Write = function () {
    var W = '';
    var WasMetaSign = false;
    for (var pIndex = this.pFirst; pIndex !== null; pIndex = pIndex.pNext) {
        var C = {};
        WasMetaSign = pIndex.pMember.ElChar(C) && C.c == msMetaSign;
        if (pIndex.pMember.ElChar(C) && (C.c == msDegree || C.c == msMinute) &&
            (W.length == 0 || isdigit(W[W.length - 1]))) {
            W = W + '`' + C.c + '\'';
            continue;
        }
        W += pIndex.pMember.Write();
    }
    return W;
}

EdList.prototype.SWrite = function () {
    var index = this.pFirst;
    var W = "";
    var WasMetaSign = false;
    var C = {};
    for (var pIndex = this.pFirst; pIndex !== null; pIndex = pIndex.pNext) {
        if (this.pMother !== null && (this.pMother.pMember.Type == 'EdSyst' || this.pMother.pMember.Type == 'EdMatr')) {
            if (index.pMember.ElChar(C) && C.c == ';' && index.pMember.vis && !WasMetaSign) {
                WasMetaSign = index.pMember.ElChar(C) && C.c == msMetaSign;
            }
        }
        if (this.pMother !== null && this.pMother.pMember.Type == 'EdMatr' &&
            index.pMember.ElChar(C) && C.c == ' ' && index.pPrev !== null &&
            index.pPrev.pMember.ElChar(C) && C.c != ' ') {
            if (SWriteMode != "Matrix")
                W = W + ',';
        } else {
            if (index.pMember.ElChar(C) && (C.c == msDegree || C.c == msMinute)) {
                W = W + charToTex(C.c);
                index = index.pNext;
                continue;
            }
        }
        W = W + index.pMember.SWrite();
        index = index.pNext;
    }
    return W;
}

EdList.prototype.MoveLeft = function (pL) {
    if (pL.pSub_L.pCurr === null)
        if (pL.pSub_L.pLast === null) {
            if (pL.pSub_L.pMother !== null)
                if (!pL.pSub_L.pMother.pMember.MoveToPrev(pL)) {
                    var pIndCurr = pL.pSub_L.pMother;
                    pL.pSub_L = pL.pSub_L.pMother.pMother;
                    pL.pSub_L.pCurr = pIndCurr;
                }
        } else {
            if (!pL.pSub_L.pLast.pMember.MoveInLeft(pL))
                pL.pSub_L.pCurr = pL.pSub_L.pLast;
        }
    else
    if (pL.pSub_L.pCurr.pPrev === null) {
        if (pL.pSub_L.pMother !== null)
            if (!pL.pSub_L.pMother.pMember.MoveToPrev(pL)) {
                var pIndCurr = pL.pSub_L.pMother;
                pL.pSub_L = pL.pSub_L.pMother.pMother;
                pL.pSub_L.pCurr = pIndCurr;
            }
    } else {
        if (!pL.pSub_L.pCurr.pPrev.pMember.MoveInLeft(pL))
            pL.pSub_L.pCurr = pL.pSub_L.pCurr.pPrev;
    }
    pL.pSub_L = pL.pSub_L;
}

EdList.prototype.MoveRight = function (pL) {
    if (pL.pSub_L.pCurr === null) {
        if (pL.pSub_L.pMother !== null) {
            if (!pL.pSub_L.pMother.pMember.MoveToNext(pL)) {
                var pIndCurr = pL.pSub_L.pMother.pNext;
                pL.pSub_L = pL.pSub_L.pMother.pMother;
                pL.pSub_L.pCurr = pIndCurr;
            }
        }
    } else
    if (!pL.pSub_L.pCurr.pMember.MoveInRight(pL))
        pL.pSub_L.pCurr = pL.pSub_L.pCurr.pNext;
}

EdList.prototype.MoveUp = function (pL) {
    for (var pIndList = pL.pSub_L; pIndList.pMother !== null; pIndList = pIndList.pMother.pMother) {
        ppL = {
            pSub_L: pIndList
        };
        if (pIndList.pMother.pMember.MoveToUp(ppL)) {
            pL.pSub_L = ppL.pSub_L;
            return;
        }
    }
}

EdList.prototype.MoveDown = function (pL) {
    for (var pIndList = pL.pSub_L; pIndList.pMother !== null; pIndList = pIndList.pMother.pMother) {
        ppL = {
            pSub_L: pIndList
        };
        if (pIndList.pMother.pMember.MoveToDown(ppL)) {
            pL.pSub_L = ppL.pSub_L;
            return;
        }
    }
}

EdList.prototype.Curr_positionX = function () {
    if (this.pCurr === null) {
        if (this.pLast !== null) return this.pLast.Start.X + this.pLast.Size.width;
        return this.Start.X + this.Size.width;
    }
    if (this.pCurr.pMember !== null)
        return this.pCurr.pMember.Start.X;
    return 0;
}

EdList.prototype.Curr_positionY = function () {
    if (this.pCurr === null) {
        if (this.pLast !== null) return this.pLast.Start.X;
        return this.Start.Y;
    }
    return this.pCurr.pMember.Start.Y;
}

EdList.prototype.Curr_SizeX = function () {
    if (this.pCurr === null) return 0;
    return this.pCurr.pMember.Size.width;
}

EdList.prototype.Curr_SizeY = function () {
    if (this.pCurr === null) {
        if (this.pLast !== null) return this.pLast.Size.height;
        return 0;
    }
    return this.pCurr.pMember.Size.height;
}

EdList.prototype.Append_Before = function (pC) {
    var Result;
    if (this.pCurr !== null) {
        if (TXPGrEl.EditKeyPress && pC.ch == ';') {
            Result = new EdMemb(pC, this.pLast, null, this);
            this.pLast.pNext = Result;
            this.pLast = Result;
            var pRevC = Result.pPrev.pMember;
            if (pRevC === null || pRevC.ch != ';') {
                pC = new EdChar(';', this.pOwner);
                Result = new EdMemb(pC, this.pLast, null, this);
                this.pLast.pNext = Result;
                this.pLast = Result;
            }
            this.pCurr = Result;
            this.pFirstInLine = Result;
        } else {
            Result = new EdMemb(pC, this.pCurr.pPrev, this.pCurr, this);
            if (this.pCurr.pPrev !== null) {
                var pRevC = this.pCurr.pPrev.pMember;
                if (pRevC !== null && pRevC.ch == ';') {
                    this.pCurr.pPrev.pNext = Result;
                    this.pCurr.pPrev = Result;
                    this.pFirstInLine = Result;
                    if (!IsNoHebrew(pC.ch)) this.pCurr = Result;
                } else {
                    this.pCurr.pPrev.pNext = Result;
                    this.pCurr.pPrev = Result;
                }
            } else {
                this.pFirst = Result;
                this.pFirstInLine = Result;
                this.pCurr.pPrev = Result;
                var pChar = this.pCurr.pMember;
                if (pChar !== null && pChar.ch == ';') this.pCurr = Result;
            }
        }
        TXPGrEl.EditKeyPress = false;
    } else {
        Result = new EdMemb(pC, this.pLast, null, this);
        if (this.pFirst === null) {
            this.pFirst = Result;
            this.pFirstInLine = Result;
            this.Hebrew = TXPGrEl.EditKeyPress && !IsNoHebrew(pC.ch);
            TXPGrEl.EditKeyPress = this.Hebrew;
        } else
            TXPGrEl.EditKeyPress = false;
        if (this.pLast !== null) this.pLast.pNext = Result;
        this.pLast = Result;
        this.pCurr = null;
    }
    return Result;
}

EdList.prototype.MemberDelete = function (pM) {
    if (pM === null) return;
    if (pM.pPrev !== null) pM.pPrev.pNext = pM.pNext;
    if (pM.pNext !== null) pM.pNext.pPrev = pM.pPrev;
    if (this.pFirst == pM) this.pFirst = pM.pNext;
    if (this.pFirstInLine == pM) this.pFirstInLine = pM.pNext;
    if (this.pLast == pM) this.pLast = pM.pPrev;
    if (pM == this.pCurr) this.pCurr = this.pCurr.pNext;
}

EdList.prototype.PrevDelete = function () {
    if (this.pCurr !== null)
        this.MemberDelete(this.pCurr.pPrev);
    else
        this.MemberDelete(this.pLast);
}

EdList.prototype.NextDelete = function () {
    this.MemberDelete(this.pCurr);
}

EdList.prototype.Splitted = function () {
    for (var pIndex = this.pFirst; pIndex !== null; pIndex = pIndex.pNext)
        if (pIndex.StrSeparat()) return true;
    return false;
}

EdList.prototype.GetFragment = function () {
    var Result = '';
    for (var pIndex = this.pFirst; pIndex !== null; pIndex = pIndex.pNext)
        Result += pIndex.pMember.GetFragment();
    return Result;
}

EdList.prototype.SelectFragment = function (FRect) {
    for (var pIndex = this.pFirst; pIndex !== null; pIndex = pIndex.pNext) {
        pIndex.pMember.SelectFragment(FRect);
        this.Selected = this.Selected || pIndex.pMember.Selected;
    }
}

EdList.prototype.ClearSelection = function () {
    for (var pIndex = this.pFirst; pIndex !== null; pIndex = pIndex.pNext)
        pIndex.pMember.ClearSelection();
    this.Selected = false;
}

EdList.prototype.Select = function () {
    this.Selected = true;
    for (var pIndex = this.pFirst; pIndex !== null; pIndex = pIndex.pNext)
        pIndex.pMember.Selected = true;
}

EdList.prototype.PreCalc = function (Parg, S, A) {
    this.Start = Parg.Clone();
    var P = Parg.Clone();
    if (this.pMother === null) this.pOwner.SetPowerSize(0, true);
    if (this.Primary) {
        this.PrevSize.width = 0;
        this.PrevSize.height = 0;
        this.PrevAxis.x = 0;
    }
    if (this.pFirst === null) {
        this.Size.width = 0;
        this.Size.height = 0;
        this.Axis.x = 0;
        if (this.pMother !== null) this.pOwner.SizeEmptySign(this.Size, this.Axis);
    } else {
        this.pFirst.PreCalc(P, this.pFirst.Size, this.pFirst.Axis);
        var LStartY = this.Start.Y;
        var RStartY = this.Start.Y;
        if (LStartY + this.PrevAxis.x < RStartY + this.pFirst.Axis.x)
            LStartY = RStartY + this.pFirst.Axis.x - this.PrevAxis.x;
        if (LStartY + this.PrevAxis.x > RStartY + this.pFirst.Axis.x && this.pFirst.Size.height != 0)
            RStartY = LStartY + this.PrevAxis.x - this.pFirst.Axis.x;
        this.PrevSize.height = Math.max(LStartY + this.PrevSize.height, RStartY + this.pFirst.Size.height) - this.Start.Y;
        this.PrevAxis.x = this.pFirst.Axis.x + RStartY - this.Start.Y;
        if (this.pFirst.pNext !== null) {
            var Tai = new EdListTail(this);
            if (!this.ReCalc || !this.pFirst.StrSeparat()) {
                if (!this.pFirst.StrSeparat())
                    P.X = P.X + this.pFirst.Size.width;
                else {
                    if (this.pMother === null)
                        P.X = this.pOwner.Start.X;
                    else
                        P.X = this.pMother.pMember.pAA.Start.X;
                    P.Y += this.PrevSize.height + StepString;
                    Tai.Primary = true;
                }
                Tai.PreCalc(P, Tai.Size, Tai.Axis);
                if (!this.pFirst.StrSeparat()) {
                    if (this.pFirst.Start.Y + this.pFirst.Axis.x < Tai.Start.Y + Tai.Axis.x) {
                        this.pFirst.Start.Y = Tai.Start.Y + Tai.Axis.x - this.pFirst.Axis.x;
                        this.pFirst.PreCalc(this.pFirst.Start, this.pFirst.Size, this.pFirst.Axis);
                    }
                    if (this.pFirst.Start.Y + this.pFirst.Axis.x > Tai.Start.Y + Tai.Axis.x && Tai.Size.height != 0) {
                        Tai.Start.Y = this.pFirst.Start.Y + this.pFirst.Axis.x - Tai.Axis.x;
                        Tai.ReCalc = true;
                        Tai.PreCalc(Tai.Start, Tai.Size, Tai.Axis);
                    }
                    this.Size.width = this.pFirst.Size.width + Tai.Size.width;
                } else
                    this.Size.width = Math.max(this.pFirst.Size.width, Tai.Start.X + Tai.Size.width - this.pFirst.Start.X);
            } else {
                Tai.TailSize();
                this.Size.width = Math.max(this.pFirst.Size.width, Tai.Start.X + Tai.Size.width - this.pFirst.Start.X);
            }
            this.Size.height = Math.max(this.pFirst.Start.Y + this.pFirst.Size.height, Tai.Start.Y +
                Tai.Size.height) - this.Start.Y;
            this.Axis.x = this.pFirst.Axis.x + this.pFirst.Start.Y - this.Start.Y;
        } else {
            this.Size = this.pFirst.Size;
            this.Axis.x = this.pFirst.Axis.x;
            if (this.pFirst.StrSeparat())
                this.Size.height = this.Size.height + StepString + this.Size.height;
        }
    }
    this.Size.Copy(S);
    A.x = this.Axis.x;
    if (this.Primary) this.ParentCalc(null);
}

EdList.prototype.Draw = function (P) {
    if (this.Start.X != P.X || this.Start.Y != P.Y) {
        this.Start = P.Clone();
        PreCalc(this.Start, this.Size, this.Axis);
    }
    if (this.pFirst === null) {
        this.pOwner.DrawAsEmptySign(this);
        return;
    }
    for (var pIndex = this.pFirst; pIndex !== null; pIndex = pIndex.pNext)
        pIndex.Draw(pIndex.Start);
}

EdList.prototype.GetMother = function () {
    if (this.pMother === null) return null;
    return this.pMother.pMember;
}

function EdListTail(pParent) {
    EdList.call(this, pParent.pOwner);
    this.pMother = pParent.pMother;
    this.Primary = false;
    if (pParent.pFirst != null) this.pFirst = pParent.pFirst.pNext;
    this.PrevSize = pParent.PrevSize;
    this.PrevAxis = pParent.PrevAxis;
    this.ReCalc = pParent.ReCalc;
}

EdListTail.prototype = Object.create(EdList.prototype);

function EdChar(CEC, pOwn, Color) {
    this.Type = "EdChar";
    this.Font = new Font;
    if (pOwn === undefined) {
        EdElm.call(this, CEC.pOwner);
        this.ch = CEC.ch;
        this.ind = CEC.ind;
        this.vis = CEC.vis;
        this.IsInterval = CEC.IsInterval;
        this.Font.Color = CEC.Color;
        return;
    } else {
        Color = Color || "black";
        EdElm.call(this, pOwn);
        this.ch = CEC;
        this.ind = pOwn.IndReg;
        this.vis = pOwn.Visible;
        this.Font.Color = Color;
        this.IsInterval = pOwn.IsInterval;
        if (this.ch == ',' && this.IsInterval) this.ch = ';';
        pOwn.IndReg = 0;
    }
    if (this.ch == msMultSign2 && !TXPGrEl.ShowMultSign) this.ch = msMultSign1;
    if (this.ind == 2) this.ch += msMean;
    this.Font.Size = 0;
    this.SetMetrics();
}

EdChar.prototype = Object.create(EdElm.prototype);

EdChar.BracketOpen = '(';
EdChar.BracketClose = ')';
EdChar.MaxBracketWidth = 50;

EdChar.prototype.SetMetrics = function () {
    if (this.Font.Eq(Canvas.Font)) return;
    var C = this.ch == msCharNewLine || !this.vis ? "W(|?[01" : this.ch;
    if (C == msIntegral) {
        var Metrics = Canvas.GetTextMetrics(C);
        this.top = Metrics.Top;
        this.bottom = Metrics.Bottom;
        this.width = Metrics.Width;
        this.height = this.bottom - this.top + 1;
    } else {
        this.height = Canvas.Font.Size;
        this.top = 0;
        this.bottom = this.height;
        this.width = Canvas.TextWidth(C);
    }
    Canvas.Font.Copy(this.Font);
}

EdChar.prototype.Width = function () {
    this.SetMetrics();
    return this.width;
}

EdChar.prototype.Top = function () {
    this.SetMetrics();
    return this.top;
}

EdChar.prototype.Height = function () {
    if (this.ch == msCharNewLine || !this.vis) return 0;
    this.SetMetrics();
    return this.height;
}

EdChar.prototype.TextOut = function (P, WCh) {
    var add = 0;
    if (this.ch == '+' || this.ch == '-' || this.ch == '=') add = 4;
    this.pOwner.TextOut(P.X + add, P.Y, WCh);
}

EdChar.prototype.PreCalc = function (P, S, A) {
    this.Start = P.Clone();
    this.pOwner.SetRegSize(this.ind);
    var WCh = this.ch;
    this.Size.width = this.Width();
    this.Size.height = this.Height();
    if (this.ch == ')') this.Size.wiidth += 2;
    if (this.ch == '+' || this.ch == '-' || this.ch == '=') this.Size.wiidth += 8;
    if (this.ch == '(' || this.ch == ')') this.Size.height = this.Height();
    if (this.ind == 0 || this.ind == 2) this.Axis.x = Math.round(this.Size.height / 2);
    if (this.ind == 1) this.Axis.x = this.Size.height;
    if (this.ind == -1) this.Axis.x = 0;
    this.Size.Copy(S);
    A.x = this.Axis.x;
    this.pOwner.SetRegSize(0);
}

EdChar.prototype.ParentCalc = function (pNext) {
    while (this.ch == '(' && pNext !== null && !pNext.StrSeparat()) {
        var pIndex = pNext;
        pNext = pIndex.ParentCalc(pIndex.pNext);
        var NextChar = {
            c: ''
        };
        if (pIndex.ElChar(NextChar) && NextChar.c == ')') {
            pIndex.pMember.Start.Y = this.Start.Y;
            pIndex.pMember.Size.height = this.Size.height;
            pIndex.pMember.Axis.x = this.Axis.x;
            pIndex.Start.Y = this.Start.Y;
            pIndex.Size.height = this.Size.height;
            pIndex.Axis.x = this.Axis.x;
            break;
        }
        var dY = this.Start.Y - pIndex.Start.Y;
        if (dY > 0) {
            this.Start.Y = pIndex.Start.Y;
            this.Size.height += dY;
            this.Axis.x += dY;
        }
        dY = (pIndex.Start.Y + pIndex.Size.height) - (this.Start.Y + this.Size.height);
        if (dY > 0)
            this.Size.height += dY;
    }
    return pNext;
}

EdChar.prototype.Draw = function (P) {
    if (this.Start.X != P.X || this.Start.Y != P.Y) this.Start = P.Clone();
    if (this.ch == msCharNewLine || !this.vis) return;
    var WCh = this.ch;
    var pOldElement = this.pOwner.pPaintedElement;
    this.pOwner.pPaintedElement = this;
    this.pOwner.SetRegSize(this.ind);
    if ((WCh == '(' || WCh == ')') && this.Size.height > this.Height()) {
        var Width = Math.ceil(this.Width());
        var FullHeight = Canvas.Font.Size;
        Canvas.Context.textBaseline = "bottom";
        Canvas.Context.fillText(WCh, P.X, P.Y + FullHeight);
        var Idata = Canvas.Context.getImageData(P.X, P.Y, Width, FullHeight);
        var Data = Idata.data;
        Canvas.Context.clearRect(P.X, P.Y, Width, FullHeight);
        var First, Next, Col;
        for (First = 0; First < FullHeight; First++) {
            for (Col = 0; Col < Width && !Data[First * Width * 4 + Col * 4 + 3]; Col++);
            if (Col < Width) break;
        }
        for (Next = First; Next < FullHeight; Next++) {
            for (Col = 0; Col < Width && !Data[Next * Width * 4 + Col * 4 + 3]; Col++);
            if (Col == Width) break;
        }
        var ParHeight = Next - First
        var Half = Math.round(ParHeight / 2);
        var NewHeight = this.Size.height;
        var NewImage = Canvas.Context.createImageData(Width, NewHeight);
        var NewData = NewImage.data;
        var Row;
        var ParRow = First;
        for (Row = 0; Row < Half; Row++, ParRow++)
            for (Col = 0; Col < Width; Col++) {
                var iCol = Col * 4 + 3;
                NewData[Row * Width * 4 + iCol] = Data[ParRow * Width * 4 + iCol];
            }
        var HalfIndx = ParRow * Width * 4;
        var NextRow = NewHeight - ParHeight + Half;
        for (; Row < NextRow; Row++)
            for (Col = 0; Col < Width; Col++) {
                iCol = Col * 4 + 3;
                NewData[Row * Width * 4 + iCol] = Data[HalfIndx + iCol];
            }
        for (ParRow++; ParRow < Next; Row++, ParRow++)
            for (Col = 0; Col < Width; Col++) {
                iCol = Col * 4 + 3;
                NewData[Row * Width * 4 + iCol] = Data[ParRow * Width * 4 + iCol];
            }
        Canvas.Context.textBaseline = "top";
        Canvas.Context.putImageData(NewImage, P.X, P.Y);
    } else {
        if (this.Font.Color != "black") {
            this.Font.Weight = "bold";
            var OldFont = Canvas.Font.Clone();
            Canvas.setFont(this.Font);
            this.TextOut(P, WCh);
            Canvas.setFont(OldFont);
        } else
            this.TextOut(P, WCh);
    }
    this.pOwner.pPaintedElement = pOldElement;
}

EdChar.prototype.Write = function () {
    var S = 0;
    if (this.ind == 1) S = msHighReg;
    if (this.ind == -1) S = msLowReg;
    if (this.ind == 2) S = msMean;
    if (!this.vis && this.ch != msMultSign1 && this.ch != msMultSign2) S += msMetaSign;
    if (S === 0) return this.ch;
    return S + this.ch;
}

EdChar.prototype.StrSeparat = function () {
    return this.ch == msCharNewLine || (this.ch == ';' && !this.IsInterval);
}

EdChar.prototype.ElChar = function (C) {
    C.c = this.ch;
    return true;
}

EdChar.prototype.SetColor = function (Color) {
    this.Font.Color = Color;
}

EdChar.prototype.SelectFragment = function (FRect) {
    EdElm.prototype.SelectFragment.apply(this, arguments);
    this.Selected = this.Selected || !((FRect.top > this.Start.Y + this.Size.height) || (FRect.bottom < this.Start.Y) ||
        (FRect.left > this.Start.X + this.Size.width) || (FRect.right < this.Start.X));
}

EdChar.prototype.SWrite = function () {
    var S = charToTex(this.ch);
    if (this.ind == 1)
        return "\\superscript{" + S + "}";
    if (this.ind == -1)
        return "\\subscript{" + S + "}";
    if (this.ind == 2)
        return "\\mean{" + S + "}";
    return S;
}

function EdTwo(pOwn) {
    EdElm.call(this, pOwn);
    this.pAA = new EdList(this.pOwner);
    this.pBB = new EdList(this.pOwner);
}

EdTwo.prototype = Object.create(EdElm.prototype);

EdTwo.prototype.GetFragment = function () {
    if (this.Selected) return this.Write() + '&';
    return this.pAA.GetFragment() + this.pBB.GetFragment();
}

EdTwo.prototype.SelectFragment = function (Rect) {
    this.pAA.SelectFragment(Rect);
    this.pBB.SelectFragment(Rect);
    this.Selected = this.pAA.Selected && this.pBB.Selected;
}

EdTwo.prototype.ClearSelection = function () {
    this.pAA.ClearSelection();
    this.pBB.ClearSelection();
    this.Selected = false;
}

function EdPowr(pOwn) {
    EdTwo.call(this, pOwn);
    this.Type = 'EdPowr';
}

EdPowr.prototype = Object.create(EdTwo.prototype);

EdPowr.prototype.SetCurrent = function (C, pSL, pCr) {
    pSL.p = this.pAA;
    var pCurr = {
        p: this.pAA.pCurr
    };
    var Result = pSL.p.SetCurrent(C, pSL, pCurr);
    this.pAA.pCurr = pCurr.p;
    if (Result) {
        pCr.p = pCurr.p;
        return true;
    }
    if (this.pAA.pFirst === null && this.pAA.Start.X <= C.X && this.pAA.Start.X + this.pAA.Size.width >= C.X && this.pAA.Start.Y <= C.Y &&
        this.pAA.Start.Y + this.pAA.Size.height >= C.Y) {
        pCr.p = null;
        return true;
    }
    pSL.p = this.pBB;
    pCurr.p = this.pBB.pCurr;
    Result = pSL.p.SetCurrent(C, pSL, pCurr);
    this.pBB.pCurr = pCurr.p;
    if (Result) {
        pCr.p = pCurr.p;
        return true;
    }
    if (this.pBB.pFirst === null && this.pBB.Start.X <= C.X && this.pBB.Start.X + this.pBB.Size.width >= C.X && this.pBB.Start.Y <= C.Y &&
        this.pBB.Start.Y + this.pBB.Size.height >= C.Y) {
        pCr.p = null;
        return true;
    }
    pSL.p = this.pAA; // { element not found - set position on the } of power basic }
    return true;
}

EdPowr.prototype.PreCalc = function (P, S, A) {
    var BaseLevel = this.pOwner.DrawingPower == 0;
    this.Start = P.Clone();
    var P1 = this.Start,
        P2 = new TPoint(0, 0),
        S1 = new QSize(0, 0),
        S2 = new QSize(0, 0);
    this.pAA.PreCalc(P1, S1, this.pAA.Axis);
    P2.X = this.pAA.Start.X + S1.width;
    P2.Y = P1.Y;
    this.pOwner.SetPowerSize(+1, BaseLevel);
    this.pBB.PreCalc(P2, S2, this.pBB.Axis);
    this.pOwner.SetPowerSize(-1, BaseLevel);
    if (S1.height <= S2.height)
        this.pAA.Start.Y = Math.round(this.pAA.Start.Y + S2.height - S1.height / 2);
    if (S1.height > S2.height)
        this.pAA.Start.Y = Math.round(this.pAA.Start.Y + S2.height / 2);
    if (this.pAA.Start.Y != P1.Y)
        this.pAA.PreCalc(this.pAA.Start, this.pAA.Size, this.pAA.Axis);
    this.Size.width = Math.round(S1.width + S2.width + this.pOwner.TextWidth('-') / 3);
    this.Size.height = this.pAA.Start.Y + this.pAA.Size.height - this.Start.Y;
    this.Axis.x = this.pAA.Start.Y - this.Start.Y + this.pAA.Axis.x;
    this.Size.Copy(S);
    A.x = this.Axis.x;
}

EdPowr.prototype.Draw = function (P) {
    if (this.Start.X != P.X || this.Start.Y != P.Y) {
        this.Start = P;
        PreCalc(this.Start, this.Size, this.Axis);
    }
    var BaseLevel = this.pOwner.DrawingPower == 0;
    this.pAA.Draw(this.pAA.Start);
    this.pOwner.SetPowerSize(1, BaseLevel);
    this.pBB.Draw(this.pBB.Start);
    this.pOwner.SetPowerSize(-1, BaseLevel);
}

EdPowr.prototype.Write = function () {
    return "((" + this.pAA.Write() + ")^(" + this.pBB.Write() + "))";
}

EdPowr.prototype.MoveInRight = function (pL) {
    pL.pSub_L = this.pAA;
    pL.pSub_L.pCurr = this.pAA.pFirst;
    return true;
}

EdPowr.prototype.MoveInLeft = function (pL) {
    pL.pSub_L = this.pBB;
    pL.pSub_L.pCurr = null;
    return true;
}

EdPowr.prototype.MoveToNext = function (pL) {
    if (pL.pSub_L != this.pAA) return false;
    pL.pSub_L = this.pBB;
    pL.pSub_L.pCurr = this.pBB.pFirst;
    return true;
}

EdPowr.prototype.MoveToPrev = function (pL) {
    if (pL.pSub_L != this.pBB) return false;
    pL.pSub_L = this.pAA;
    pL.pSub_L.pCurr = null;
    return true;
}

EdPowr.prototype.MoveToUp = function (pL) {
    if (pL.pSub_L != this.pAA) return false;
    pL.pSub_L = this.pBB;
    pL.pSub_L.pCurr = this.pBB.pFirst;;
    return true;
}

EdPowr.prototype.MoveToDown = function (pL) {
    if (pL.pSub_L != this.pBB) return false;
    pL.pSub_L = this.pAA;
    pL.pSub_L.pCurr = null;
    return true;
}

EdPowr.prototype.SWrite = function () {
    return "\\power{" + this.pAA.SWrite() + "}{" + this.pBB.SWrite() + "}";
}

function EdRoot(pOwn) {
    EdPowr.call(this, pOwn);
    this.Type = 'EdRoot';
}

EdRoot.prototype = Object.create(EdPowr.prototype);

EdRoot.prototype.PreCalc = function (P, S, A) {
    var BaseLevel = this.pOwner.DrawingPower == 0;
    this.Start = P.Clone();
    var P2 = this.Start,
        P1 = new TPoint(0, 0);
    var S1 = new QSize(0, 0),
        S2 = new QSize(0, 0);
    this.pOwner.SetPowerSize(1, BaseLevel);
    this.pBB.PreCalc(P2, S2, this.pBB.Axis);
    this.pOwner.SetPowerSize(-1, BaseLevel);
    P1.X = P2.X + S2.width + 6;
    P1.Y = P2.Y + 2;
    this.pAA.PreCalc(P1, S1, this.pAA.Axis);
    if (Math.round(S1.height / 2) < S2.height + 2) {
        this.pAA.Start.Y = this.pAA.Start.Y + S2.height + 2 - Math.round(S1.height / 2);
        this.pAA.PreCalc(this.pAA.Start, this.pAA.Size, this.pAA.Axis);
    }
    this.Size.width = S1.width + S2.width + 8;
    this.Size.height = this.pAA.Start.Y + this.pAA.Size.height - this.Start.Y;
    this.Axis.x = this.pAA.Start.Y - this.Start.Y + this.pAA.Axis.x;
    this.Size.Copy(S);
    A.x = this.Axis.x;
}

EdRoot.prototype.Draw = function (P) {
    if (this.Start.X != P.X || this.Start.Y != P.Y) {
        this.Start = P.Clone();
        PreCalc(this.Start, this.Size, this.Axis);
    }
    var pOldElement = this.pOwner.pPaintedElement;
    this.pOwner.pPaintedElement = this;
    var BaseLevel = this.pOwner.DrawingPower == 0;
    this.pAA.Draw(this.pAA.Start);
    this.pOwner.SetPowerSize(1, BaseLevel);
    this.pBB.Draw(this.pBB.Start);
    this.pOwner.SetPowerSize(-1, BaseLevel);
    this.pOwner.Line(this.pAA.Start.X - 1, this.pAA.Start.Y - 2, this.pAA.Start.X + this.pAA.Size.width + 1, this.pAA.Start.Y - 2);
    this.pOwner.Line(this.pAA.Start.X - 1, this.pAA.Start.Y - 1, this.pBB.Start.X + 4, this.pAA.Start.Y + this.pAA.Size.height);
    this.pOwner.Line(this.pBB.Start.X, this.pBB.Start.Y + 2 + this.pBB.Size.height, this.pBB.Start.X + 3,
        this.pBB.Start.Y + 2 + this.pBB.Size.height);
    this.pOwner.Line(this.pBB.Start.X, this.pBB.Start.Y + 3 + this.pBB.Size.height,
        this.pBB.Start.X + 3, this.pBB.Start.Y + 3 + this.pBB.Size.height);
    this.pOwner.Line(this.pBB.Start.X + 3, this.pBB.Start.Y + 2 + this.pBB.Size.height,
        this.pBB.Start.X + 3, this.pAA.Start.Y + this.pAA.Size.height);
    this.pOwner.Line(this.pBB.Start.X + 4, this.pBB.Start.Y + 2 + this.pBB.Size.height,
        this.pBB.Start.X + 4, this.pAA.Start.Y + this.pAA.Size.height);
    this.pOwner.pPaintedElement = pOldElement;
}

EdRoot.prototype.Write = function () {
    return "((" + this.pAA.Write() + ")~(" + this.pBB.Write() + "))";
}

EdRoot.prototype.MoveInRight = function (pL) {
    pL.pSub_L = this.pBB;
    pL.pSub_L.pCurr = this.pBB.pFirst;
    return true;
}

EdRoot.prototype.MoveInLeft = function (pL) {
    pL.pSub_L = this.pAA;
    pL.pSub_L.pCurr = null;
    return true;
}

EdRoot.prototype.MoveToNext = function (pL) {
    if (pL.pSub_L != this.pBB) return false;
    pL.pSub_L = this.pAA;
    pL.pSub_L.pCurr = this.pAA.pFirst;
    return true;
}

EdRoot.prototype.MoveToPrev = function (pL) {
    if (pL.pSub_L != this.pAA) return false;
    pL.pSub_L = this.pBB;
    pL.pSub_L.pCurr = null;
    return true;
}

EdRoot.prototype.MoveToUp = function (pL) {
    if (pL.pSub_L != this.pAA) return false;
    pL.pSub_L = this.pBB;
    pL.pSub_L.pCurr = null;
    return true;
}

EdRoot.prototype.MoveToDown = function (pL) {
    if (pL.pSub_L != this.pBB) return false;
    pL.pSub_L = this.pAA;
    pL.pSub_L.pCurr = this.pAA.pFirst;
    return true;
}

EdRoot.prototype.SWrite = function () {
    return "\\root{" + this.pBB.SWrite() + "}{" + this.pAA.SWrite() + "}";
}

function EdSqRoot(pOwn) {
    EdRoot.call(this, pOwn);
    this.Type = 'EdSqRoot';
}

EdSqRoot.prototype = Object.create(EdRoot.prototype);

EdSqRoot.prototype.PreCalc = function (P, S, A) {
    var BaseLevel = this.pOwner.DrawingPower == 0;
    var P2 = this.Start,
        P1 = new TPoint(0, 0);
    var S1 = new QSize(0, 0),
        S2 = new QSize(0, 0);
    this.pOwner.SetPowerSize(1, BaseLevel);
    this.pBB.PreCalc(P2, S2, this.pBB.Axis);
    this.pOwner.SetPowerSize(-1, BaseLevel);
    P1.X = P2.X + S2.width + 6;
    P1.Y = P2.Y + 2;
    this.pAA.PreCalc(P1, S1, this.pAA.Axis);
    if (Math.round(S1.height / 2) < S2.height + 2) {
        this.pAA.Start.Y = this.pAA.Start.Y + S2.height + 2 - Math.round(S1.height / 2);
        this.pAA.PreCalc(this.pAA.Start, this.pAA.Size, this.pAA.Axis);
    }
    this.Size.width = S1.width + S2.width + 8;
    this.Size.height = this.pAA.Start.Y + this.pAA.Size.height - this.Start.Y;
    this.Axis.x = this.pAA.Start.Y - this.Start.Y + this.pAA.Axis.x;
    this.Size.Copy(S);
    A.x = this.Axis.x;
}

EdSqRoot.prototype.Draw = function (P) {
    if (this.Start.X != P.X || this.Start.Y != P.Y) {
        this.Start = P.Clone();
        this.PreCalc(this.Start, this.Size, this.Axis);
    }
    this.pAA.Draw(this.pAA.Start);
    var pOldElement = this.pOwner.pPaintedElement;
    this.pOwner.pPaintedElement = this;
    //    var Pen = this.pOwner.pCanvas.pen();
    //    this.pOwner.pCanvas.setPen(Pen);
    this.pOwner.Line(this.pAA.Start.X - 1, this.pAA.Start.Y - 2, this.pAA.Start.X + this.pAA.Size.width + 1, this.pAA.Start.Y - 2);
    this.pOwner.Line(this.pAA.Start.X - 1, this.pAA.Start.Y - 1, this.pBB.Start.X + 4, this.pAA.Start.Y + this.pAA.Size.height); //???
    this.pOwner.Line(this.pBB.Start.X, this.pBB.Start.Y + 2 + this.pBB.Size.height, this.pBB.Start.X + 3, this.pBB.Start.Y + 2 + this.pBB.Size.height);
    this.pOwner.Line(this.pBB.Start.X, this.pBB.Start.Y + 3 + this.pBB.Size.height, this.pBB.Start.X + 3, this.pBB.Start.Y + 3 + this.pBB.Size.height);
    this.pOwner.Line(this.pBB.Start.X + 3, this.pBB.Start.Y + 2 + this.pBB.Size.height, this.pBB.Start.X + 3, this.pAA.Start.Y + this.pAA.Size.height);
    this.pOwner.Line(this.pBB.Start.X + 4, this.pBB.Start.Y + 2 + this.pBB.Size.height, this.pBB.Start.X + 4, this.pAA.Start.Y + this.pAA.Size.height);
    this.pOwner.pPaintedElement = pOldElement;
}

EdSqRoot.prototype.Write = function () {
    return "((" + this.pAA.Write() + ")~(" + this.pBB.Write() + "))";
}

EdSqRoot.prototype.MoveInRight = function (pL) {
    pL.pSub_L = this.pBB;
    pL.pSub_L.pCurr = this.pBB.pFirst;
    return true;
}

EdSqRoot.prototype.MoveInLeft = function (pL) {
    pL.pSub_L = this.pAA;
    pL.pSub_L.pCurr = null;
    return true;
}

EdSqRoot.prototype.MoveToNext = function (pL) {
    return false;
}

EdSqRoot.prototype.MoveToPrev = function (pL) {
    return false;
}

EdSqRoot.prototype.MoveToUp = function (pL) {
    return false;
}

EdSqRoot.prototype.MoveToDown = function (pL) {
    return false;
}

EdSqRoot.prototype.SWrite = function () {

    return "\\sqrt{" + this.pAA.SWrite() + "}";
}

function EdFrac(pOwn) {
    EdTwo.call(this, pOwn);
    this.Type = 'EdFrac';
}

EdFrac.prototype = Object.create(EdTwo.prototype);

EdFrac.prototype.SetCurrent = function (C, pSL, pCr) {
    pSL.p = this.pAA;
    var pCurr = {
        p: this.pAA.pCurr
    };
    var Result = pSL.p.SetCurrent(C, pSL, pCurr);
    this.pAA.pCurr = pCurr.p;
    if (Result) {
        pCr.p = pCurr.p;
    } else {
        if ((this.pAA.pFirst == null) &&
            (this.pAA.Start.X <= C.X) &&
            (this.pAA.Start.X + this.pAA.Size.width >= C.X) &&
            (this.pAA.Start.Y <= C.Y) &&
            (this.pAA.Start.Y + this.pAA.Size.height >= C.Y)) {
            pCr.p = null;
        } else {
            pSL.p = this.pBB;
            if ((this.pBB.pFirst == null) &&
                (this.pBB.Start.X <= C.X) &&
                (this.pBB.Start.X + this.pBB.Size.width >= C.X) &&
                (this.pBB.Start.Y <= C.Y) &&
                (this.pBB.Start.Y + this.pBB.Size.height >= C.Y)) {
                pCr.p = null;
            } else {
                pSL.p = this.pBB;
            }
        }
        return true;
    }

    // if (this.pAA.pFirst === null && this.pAA.Start.X <= C.X && this.pAA.Start.X + this.pAA.Size.width >= C.X && this.pAA.Start.Y <= C.Y &&
    //     this.pAA.Start.Y + this.pAA.Size.height >= C.Y) {
    //     pCr.p = null;
    // } else {
    //     pSL.p = this.pBB;
    //     pCurr.p = this.pBB.pCurr;
    //     Result = pSL.p.SetCurrent(C, pSL, pCurr);
    //     this.pBB.pCurr = pCurr.p;
    //     if (this.pBB.pFirst === null && this.pBB.Start.X <= C.X && this.pBB.Start.X + this.pBB.Size.width >= C.X && this.pBB.Start.Y <= C.Y &&
    //         this.pBB.Start.Y + this.pBB.Size.height >= C.Y) {
    //         pCr.p = null;
    //     } else {
    //         pSL.p = this.pBB;
    //     } 
    //     return true;
    // }
}

EdFrac.prototype.PreCalc = function (P, S, A) {
    this.Start = P.Clone();
    var P1 = new TPoint(0, 0),
        P2 = new TPoint(0, 0),
        S1 = new QSize(0, 0),
        S2 = new QSize(0, 0);
    P1 = this.Start;
    P1.X = this.Start.X;
    this.pAA.PreCalc(P1, S1, this.pAA.Axis);
    P2.X = this.pAA.Start.X;
    P2.Y = this.pAA.Start.Y + S1.height + 4;
    this.pBB.PreCalc(P2, S2, this.pBB.Axis);
    if (S1.width < S2.width) {
        this.pAA.Start.X = Math.round(this.pAA.Start.X + S2.width - S1.width / 2);
        this.pAA.PreCalc(this.pAA.Start, this.pAA.Size, this.pAA.Axis);
    }
    if (S1.width > S2.width) {
        this.pBB.Start.X = Math.round(this.pBB.Start.X + (S1.width - S2.width) / 2);
        this.pBB.PreCalc(this.pBB.Start, this.pBB.Size, this.pBB.Axis);
    }

    this.Axis.x = this.pAA.Size.height + 2;
    this.Size.width = Math.max(this.pAA.Size.width, this.pBB.Size.width);
    this.Size.height = Math.round(this.pAA.Size.height + this.pBB.Size.height + 6);
    this.Size.Copy(S);
    A.x = this.Axis.x;
}

EdFrac.prototype.Draw = function (P) {
    var pOldElement = this.pOwner.pPaintedElement;
    this.pOwner.pPaintedElement = this;
    if ((this.Start.X != P.X) || (this.Start.Y != P.Y)) {
        this.Start = P;
        this.PreCalc(this.Start, this.Size, this.Axis);
    }

    this.pAA.Draw(this.pAA.Start);
    this.pBB.Draw(this.pBB.Start);

    this.pOwner.Line(Math.min(this.pAA.Start.X, this.pBB.Start.X), this.pAA.Start.Y + this.Axis.x, Math.max(this.pAA.Start.X + this.pAA.Size.width, this.pBB.Start.X + this.pBB.Size.width), this.pAA.Start.Y + this.Axis.x);

    this.pOwner.pPaintedElement = pOldElement;
}

EdFrac.prototype.MoveInRight = function (pL) {
    if (this.pAA.Start.X <= this.pBB.Start.X) {
        pL.pSub_L = this.pAA;
        pL.pSub_L.pCurr = this.pAA.pFirst;
    } else {
        pL.pSub_L = this.pBB;
        pL.pSub_L.pCurr = this.pBB.pFirst;
    }
    return true;
}

EdFrac.prototype.MoveInLeft = function (pL) {
    if (this.pAA.Start.X <= this.pBB.Start.X) {
        pL.pSub_L = this.pAA;
    } else {
        pL.pSub_L = this.pBB;
    }
    pL.pSub_L.pCurr = null;
    return true;
}

EdFrac.prototype.MoveToUp = function (pL) {
    if (pL.pSub_L = this.pBB) {
        pL.pSub_L = this.pAA;
        pL.pSub_L.pCurr = this.pAA.pFirst;
        return true;
    } else {
        return false;
    }
}

EdFrac.prototype.MoveToDown = function (pL) {
    if (pL.pSub_L = this.pAA) {
        pL.pSub_L = this.pBB;
        pL.pSub_L.pCurr = this.pBB.pFirst;
        return true;
    } else {
        return false;
    }
}

EdFrac.prototype.SWrite = function () {
    var NOMstr, DENstr;
    NOMstr = this.pAA.SWrite();
    DENstr = this.pBB.SWrite();
    return "\\frac{" + NOMstr + "}{" + DENstr + "}";
}

EdFrac.prototype.Write = function () {
    var NOMstr, DENstr;
    NOMstr = this.pAA.Write;
    DENstr = this.pBB.Write;
    if (Number.isInteger(NOMstr) && Number.isInteger(DENstr)) {
        return "{(" + NOMstr + ")/(" + DENstr + ")}";
    }
    return "((" + NOMstr + ")/(" + DENstr + "))";
}

function EdLg(pOwn, Str) {
    EdElm.call(this, pOwn);
    this.pAA = new EdList(this.pOwner);
    this.pNN = new EdList(this.pOwner);
    this.pB1 = new EdList(this.pOwner);
    this.pB2 = new EdList(this.pOwner);

    for (var i = 0; i < Str.length; i++) {
        this.pNN.Append_Before(new EdChar(Str[i], this.pOwner))
    }

    this.pB1.Append_Before(new EdChar('(', this.pOwner));
    this.pB2.Append_Before(new EdChar(')', this.pOwner));

    this.Type = 'EdLg';
}

EdLg.prototype = Object.create(EdTwo.prototype);

EdLg.prototype.SetCurrent = function (C, pSL, pCr) {
    pSL.p = this.pNN;
    var pCurr = {
        p: this.pAA.pCurr
    };
    var Result = pSL.p.SetCurrent(C, pSL, pCurr);
    this.pAA.pCurr = pCurr.p;
    if (Result) {
        pCr.p = null;
    } else if ((this.pNN.pFirst == null) &&
        (this.pNN.Start.X <= C.X) &&
        (this.pNN.Start.X + this.pNN.Size.width() >= C.X) &&
        (this.pNN.Start.Y <= C.Y) &&
        (this.pNN.Start.Y + this.pNN.Size.height() >= C.Y)) {
        pCr.p = null;
    } else {
        pSL.p = this.pAA;
        if (pSL.p.SetCurrent(C, pSL, pCurr)) {
            pCr.p = null;
        } else if ((this.pAA.pFirst == null) &&
            (this.pAA.Start.X <= C.X) &&
            (this.pAA.Start.X + this.pAA.Size.width >= C.X) &&
            (this.pAA.Start.Y <= C.Y) &&
            (this.pAA.Start.Y + this.pAA.Size.height >= C.Y)) {
            pCr.p = null;
        } else {
            pSL.p = this.pAA;
        }
    }
    return true;
}

EdLg.prototype.PreCalc = function (P, S, A) {
    this.Start = P.Clone();
    var P1 = new TPoint(0, 0),
        P2 = new TPoint(0, 0),
        PN = new TPoint(0, 0),
        S1 = new QSize(0, 0),
        SN = new QSize(0, 0);

    PN = P;
    this.pNN.PreCalc(PN, SN, this.pNN.Axis);
    P1.X = PN.X + SN.width + 4;
    P1.Y = PN.Y;
    this.pAA.PreCalc(P1, S1, this.pAA.Axis);

    if (this.pNN.Axis < this.pAA.Axis) {
        PN.Y += this.pAA.Axis - this.pNN.Axis;
        this.pNN.PreCalc(PN, SN, this.pNN.Axis);
    }

    if (this.pAA.Axis < this.pNN.Axis) {
        P1.Y += this.pNN.Axis - this.pAA.Axis;
        this.pAA.PreCalc(P1, S1, this.pAA.Axis);
    }

    this.Size.width = P1.X + S1.width;
    this.Size.width = this.Size.width - this.Start.X;
    this.Size.width = this.Size.width + 4;

    this.Size.height = P1.X + S1.height;
    this.Size.height = this.Size.height - this.Start.Y;

    P2 = this.pAA.Start;
    this.pB1.PreCalc(P2, this.pB1.Size, this.pB1.Axis);
    this.pB1.pFirst.pMember.Size.height = this.pAA.Size.rheight;
    this.Size.width = this.Size.width + 20;

    this.pAA.Start.X = this.pAA.Start.X + 12;
    this.pAA.PreCalc(this.pAA.Start, this.pAA.Size, this.pAA.Axis);

    P2.Y = this.pAA.Start.Y;
    P2.X = this.pAA.Start.X + this.pAA.Size.width;
    this.pB2.PreCalc(P2, this.pB2.Size, this.pB2.Axis);
    this.pB2.pFirst.pMember.Size.height = this.pAA.Size.height;
    this.Size.width = this.Size.width + 20;

    this.Axis = P1.Y - this.Start.Y + this.pAA.Axis;
    S = this.Size;
    A = this.Axis;
}

EdLg.prototype.Draw = function (P) {
    if ((this.Start.X != P.X) || (this.Start.Y != P.Y)) {
        this.Start = P;
        this.PreCalc(this.Start, this.Size, this.Axis);
    }
    this.pNN.Draw(this.pNN.Start);
    this.pB1.pFirst.pMember.Draw(this.pB1.Start);
    this.pAA.Draw(this.pAA.Start);
    this.pB2.pFirst.pMember.Draw(this.pB2.Start);
}

EdLg.prototype.ClearSelection = function () {
    this.pAA.ClearSelection();
    this.pNN.ClearSelection();
    this.pB1.ClearSelection();
    this.pB2.ClearSelection();
    this.Selected = false;
}

EdLg.prototype.SelectFragment = function (FRect) {
    this.pAA.SelectFragment(FRect);
    this.pNN.SelectFragment(FRect);
    this.pB1.SelectFragment(FRect);
    this.pB2.SelectFragment(FRect);
    this.Selected = this.pNN.Selected && this.pB1.Selected && this.pAA.Selected;
}

EdLg.prototype.GetFragment = function () {
    if (this.Selected) return this.Write() + '&';
    return this.pNN.GetFragment() + this.pB1.GetFragment() + this.pB2.GetFragment();
}

EdLg.prototype.Write = function () {
    return this.pNN.Write() + '(' + this.pAA.Write() + ')';
}

EdLg.prototype.MoveInRight = function (pL) {
    pL.pSub_L = this.pAA;
    pL.pSub_L.pCurr = this.pAA.pFirst;
    return true;
}

EdLg.prototype.MoveInLeft = function (pL) {
    pL.pSub_L = this.pAA;
    pL.pSub_L.pCurr = null;
    return true;
}

EdLg.prototype.MoveToNext = function (pL) {
    if (pL.pSub_L === this.pNN) {
        pL.pSub_L = this.pAA;
        pL.pSub_L.pCurr = this.pAA.pFirst;
        return true;
    } else {
        return false;
    }
}

EdLg.prototype.MoveToPrev = function (pL) {
    if (pL.pSub_L === this.pAA) {
        pL.pSub_L = this.pNN;
        pL.pSub_L.pCurr = this.pNN.pLast;
        return true;
    } else {
        return false;
    }
}

EdLg.prototype.SWrite = function () {
    return "\\" + this.pNN.SWrite() + '{' + this.pAA.SWrite() + '}';
}

var XPGEdit = {
    LeftWGEdMargin: 4,
    TopWGEdMargin: 3,
    iFontSize: 24,
    iPowDecrease: 6,
    iPenWidth: 1,
    VShift: 0,
    HShift: 0,
    Refreshing: false,
    IsCopy: false,

    Create: function () {
        Canvas.Create();
        var MainFont = new Font;
        MainFont.Size = this.iFontSize;
        var PowerFont = MainFont.Clone();
        PowerFont.Size -= this.iPowDecrease;
        this.EditSets = new EditSets(MainFont, PowerFont, PowerFont, "white", "red", "blue");
        this.pInEdit = new XPInEdit(new TPoint(0, 0), this.EditSets);
        this.height = BaseCanvas.height;
        this.width = BaseCanvas.width;
        BaseCanvas.style.background = this.EditSets.BkgrColor;
        BaseCanvas.style.paddingLeft = this.LeftWGEdMargin + 'px';
        BaseCanvas.style.paddingTop = this.TopWGEdMargin + 'px';
        Cursor.Create(new QRect(0, 0, this.width, this.height));
        this.MoveCursor();
        this.RefreshXPE();
    },

    EEditWinHeight: function () {
        var Result = this.height - this.TopWGEdMargin;
        if (Result > 0) return Result;
        return 0;
    },

    EEditWinWidth: function () {
        var Result = this.width - this.LeftWGEdMargin;
        if (Result > 0) return Result;
        return 0;
    },

    keyDownEvent: function () {
        var Uact;
        switch (event.keyCode) {
            case 37:
                Uact = new U_A_T("vk_Left");
                break;
            case 38:
                Uact = new U_A_T("vk_Up");
                break;
            case 39:
                Uact = new U_A_T("vk_Right");
                break;
            case 40:
                Uact = new U_A_T("vk_Down");
                break;
            case 46:
                Uact = new U_A_T("vk_Delete");
                break;
            case 8:
                Uact = new U_A_T("vk_Back");
                break;
            case 13:
                Uact = new U_A_T(msCharNewLine);
                break;
            default:
                return false;
        }
        this.Editor(Uact);
        TXPGrEl.EditKeyPress = false;
    },

    mousePressEvent: function () {
        var rect = BaseCanvas.getBoundingClientRect();
        var x = Math.round(event.clientX - rect.left) - this.LeftWGEdMargin;
        var y = Math.round(event.clientY - rect.top) - this.TopWGEdMargin;
        var Uact = new U_A_T(new TPoint(x + this.HShift, y + this.VShift));
        this.pInEdit.PreCalc(new TPoint(0, 0), new QSize, {});
        if (this.pInEdit.GlobalSetCurrent(Uact.Parms.X, Uact.Parms.Y))
            this.Editor(Uact);
    },

    MoveCursor: function () {
        Cursor.Hide();
        var aCursPos = this.pInEdit.GetCursorPosition();
        var CursSize = this.pInEdit.GetCursorSize();
        var CursPos = aCursPos.Clone();
        var NeedShift = false;
        if (TXPGrEl.Language == TLanguages.Hebrew) CursPos.X += this.EEditWinWidth() - this.width;
        var ClipR = Cursor.ClipRect;
        CursPos.X += ClipR.left - this.HShift;
        CursPos.Y += ClipR.top - this.VShift;
        if (CursPos.X < ClipR.left) {
            NeedShift = true;
            this.HShift = aCursPos.X;
        }
        if (CursPos.X > ClipR.right) {
            NeedShift = true;
            this.HShift = aCursPos.X + ClipR.left - ClipR.right;
        }
        if (CursPos.Y < ClipR.top) {
            NeedShift = true;
            this.VShift = aCursPos.Y;
        }
        if (CursPos.Y + CursSize > ClipR.bottom) {
            NeedShift = true;
            this.VShift = aCursPos.Y + CursSize + ClipR.top - ClipR.bottom;
        }
        if (NeedShift) {
            CursPos = aCursPos;
            CursPos.X += ClipR.left - this.HShift;
            CursPos.Y += ClipR.top - this.VShift;
        }
        Cursor.Move(CursPos, CursSize);
        Cursor.Show();
    },

    RefreshXPE: function () {
        Cursor.Hide();
        this.Refreshing = true;
        Canvas.Clear();
        this.pInEdit.EditDraw();
        this.MoveCursor();
        this.Refreshing = false;
    },

    Editor: function (Uact) {
        switch (this.pInEdit.EditAction(Uact)) {
            case EdAction.edCursor:
                this.MoveCursor();
                return;
            case EdAction.edRefresh:
                this.IsCopy = false;
                this.pInEdit.ClearSelection();
                this.RefreshXPE();
                return;
            case EdAction.edBeep:
                alert("Bad key was pressed");
                return;
            case EdAction.edInvalid:
                alert("Internal Error; Impossible to start new line!");
        }
    },

    EdKeyPress: function () {
        var Code = event.which === null ? event.keyCode : event.charCode;
        if (Code < 32) return;
        var A = String.fromCharCode(Code);
        if (!_printable(A)) return;
        if (A == '|') A = ':';
        TXPGrEl.EditKeyPress = true;
        this.Editor(new U_A_T(A));
        TXPGrEl.EditKeyPress = false;
    },

    RestoreFormula: function (Formula) {},

    RestoreFromFile: function () {},
    SaveFormula: function () {}
}