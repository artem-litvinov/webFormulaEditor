function EdVect(pOwn, Str) {
  EdAbs.call(this, pOwn);
  var arX1 = arY1 = arX2 = arY2 = dy = 0;

  this.Type = 'EdVect';
}

EdVect.prototype.PreCalc = function (P, S, A) {
  var P1 = new TPoint(0, 0),
    S1 = new QSize(0, 0);

  this.Start = P;

  P1.X = this.Start.X + 2;
  P1.Y = this.Start.Y + 8;
  this.pAA.PreCalc(P1, S1, this.pAA.Axis);

  this.Size.width = (S1.width + 4);
  DefineArrow(this.Start.X, this.Start.Y, this.Start.X + this.Size.width, this.Start.Y, arVect, arX1,
    arY1, arX2, arY2);

  dy = this.Start.Y - arY1;
  arY1 += dy;
  arY2 += dy;

  if (dy != 3) {
    P1.Y += 2 * dy - 6;
    this.pAA.PreCalc(P1, S1, this.pAA.Axis);
  }
  this.Size.height = (S1.height + Math.max(2 * dy, 6) + 2);
  this.Axis = P1.Y - this.Start.Y + this.pAA.Axis;
  S = this.Size;
  A = this.Axis;
}

EdVect.prototype.Draw = function (P) {
  if ((this.Start.X != P.X) || (this.Start.Y != P.Y)) {
    this.Start = P;
    PreCalc(this.Start, this.Size, this.Axis);
  }
  var pOldElement = this.pOwner.pPaintedElement;
  this.pOwner.pPaintedElement = this;
  this.pAA.Draw(this.pAA.Start);

  this.pOwner.Line(this.Start.X, this.Start.Y + dy, this.Start.X + this.Size.width, this.Start.Y + dy);
  this.pOwner.Line(arX1, arY1, this.Start.X + this.Size.width, this.Start.Y + dy);
  this.pOwner.Line(arX2, arY2, this.Start.X + this.Size.width, this.Start.Y + dy);
  this.pOwner.pPaintedElement = pOldElement;
}

EdVect.prototype.Write = function () {
  return '(' + VectName + '(' + this.pAA.Write() + "))";
}

EdVect.prototype.SWrite = function () {
  return "\\Vector{" + this.pAA.SWrite() + "}";
}

EdFrac.prototype.SetCurrent = function (C, pSL, pCr) {
      pSL.p = this.pAA;
    var pCurr = {
        p: this.pAA.pCurr
    };
  if (pSL.p.SetCurrent(C, pSL, pSL.p.pCurr)) {
    pCr.p = pSL.p.pCurr;
  } else
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

EdFrac.prototype.PreCalc = function (P, S, A) {
  this.Start = P;
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
    this.pAA.Start.X = this.pAA.Start.X + (S2.width - S1.width) / 2;
    this.pAA.PreCalc(this.pAA.Start, this.pAA.Size, this.pAA.Axis);
  }
  if (S1.width > S2.width) {
    this.pBB.Start.X = this.pBB.Start.X + (S1.width - S2.width) / 2;
    this.pBB.PreCalc(this.pBB.Start, this.pBB.Size, this.pBB.Axis);
  }
  this.Axis = this.pAA.Size.height + 2;
  this.Size.width = (Math.max(this.pAA.Size.width, this.pBB.Size.width));
  this.Size.height = (this.pAA.Size.height + this.pBB.Size.height + 6);
  S = this.Size;
  A = this.Axis;
}

EdFrac.prototype.Draw = function (P) {
  var pOldElement = this.pOwner.pPaintedElement;
  this.pOwner.pPaintedElement = this;
  if ((this.Start.X != P.X) || (this.Start.Y != P.Y)) {
    this.Start = P;
    PreCalc(this.Start, this.Size, this.Axis);
  }
  this.pAA.Draw(this.pAA.Start);
  this.pBB.Draw(this.pBB.Start);
  this.pOwner.Line(min(this.pAA.Start.X, this.pBB.Start.X), this.pAA.Start.Y + this.Axis,
    Math.max(this.pAA.Start.X + this.pAA.Size.width, this.pBB.Start.X + this.pBB.Size.width), this.pAA.Start.Y + this.Axis);
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
  NOMstr = this.pAA.Write();
  DENstr = this.pBB.Write();
  if (IsNumber(NOMstr) && IsNumber(DENstr))
    return "{(" + NOMstr + ")/(" + DENstr + ")}";
  return "((" + NOMstr + ")/(" + DENstr + "))";
}

function EdIntegr(pOwn, Str) {
  EdTwo.call(this, pOwn);
  this.pDD = new EdList(this.pOwner);

  this.Type = 'EdIntegr';
}

function EdIntegr(pOwn, Str) {
  EdTwo.call(this, pOwn);
  this.pDD = new EdList(this.pOwner);
  this.pDD.Append_Before(new EdChar('d', this.pOwner));
  //QFont IntFont( pOwn.EditSets.this.MainFont );
  //IntFont.setPointSize( IntFont.pointSize() * 1.5 );
  this.pIntegalSign = new EdBigChar(msIntegral, irNormal, "Black", pOwn, IntFont, 1);
  this.Type = 'EdIntegr';
}

EdIntegr.prototype.SetCurrent = function (C, pSL, pCr) {
      pSL.p = this.pAA;
    var pCurr = {
        p: this.pAA.pCurr
    };
  if (pSL.p.SetCurrent(C, pSL, pSL.p.pCurr)) {
    pCr.p = pSL.p.pCurr;
  } else {
    if ((this.pAA.pFirst == null) &&
      (this.pAA.Start.X <= C.X) &&
      (this.pAA.Start.X + this.pAA.Size.width >= C.X) &&
      (this.pAA.Start.Y <= C.Y) &&
      (this.pAA.Start.Y + this.pAA.Size.height >= C.Y)) {
      pCr.p = null;
    } else {
      pSL.p = this.pBB;
      if (pSL.p.SetCurrent(C, pSL, pSL.p.pCurr)) {
        pCr.p = pSL.p.pCurr;
      } else if ((this.pBB.pFirst == null) &&
        (this.pBB.Start.X <= C.X) &&
        (this.pBB.Start.X + this.pBB.Size.width >= C.X) &&
        (this.pBB.Start.Y <= C.Y) &&
        (this.pBB.Start.Y + this.pBB.Size.height >= C.Y)) {
        pCr.p = null;
      } else {
        pSL.p = this.pAA;
      }
    }
  }
  return true;
}

EdIntegr.prototype.PreCalc = function (P, S, A) {
  var PAA = new TPoint(0, 0),
    PBB = new TPoint(0, 0),
    PD = new TPoint(0, 0),
    SAA = new QSize(0, 0),
    SBB = new QSize(0, 0),
    SD = new QSize(0, 0);

  var IntAxis;
  this.Start = P;
  this.pIntegalSign.PreCalc(P, this.Size, IntAxis);
  this.pAA.PreCalc(P, SAA, this.pAA.Axis);
  this.pBB.PreCalc(PBB, SBB, this.pBB.Axis);
  var MaxH = Math.Math.max(SAA.height, SBB.height) * 1.5;
  if (abs(Round(MaxH) - this.Size.height) > 2) {
    this.pIntegalSign.RecalcSize(MaxH / this.Size.height);
    this.pIntegalSign.PreCalc(P, this.Size, IntAxis);
  }
  var AAY = this.Start.Y + IntAxis - SAA.height / 2;
  PAA.X = P.X + this.pIntegalSign.Width + 2;
  PAA.Y = AAY;
  this.pAA.PreCalc(PAA, SAA, this.pAA.Axis);
  PD.X = PAA.X + SAA.width + 5;
  PD.Y = AAY;
  this.pDD.PreCalc(PD, SD, this.pDD.Axis);

  PBB.X = PD.X + SD.width;
  PBB.Y = AAY;
  this.pBB.PreCalc(PBB, SBB, this.pBB.Axis);

  var ax = Math.max(this.pAA.Axis, Math.max(this.pDD.Axis, this.pBB.Axis));
  if (ax > this.pAA.Axis) {
    PAA.Y = AAY + ax - this.pAA.Axis;
    this.pAA.PreCalc(PAA, SAA, this.pAA.Axis);
  }
  if (ax > this.pDD.Axis) {
    PD.Y = AAY + ax - this.pDD.Axis;
    this.pDD.PreCalc(PD, SD, this.pDD.Axis);
  }
  if (ax > this.pBB.Axis) {
    PBB.Y = AAY + ax - this.pBB.Axis;
    this.pBB.PreCalc(PBB, SBB, this.pBB.Axis);
  }

  this.Size.width = (PBB.X + SBB.width - this.Start.X + 4);
  this.Axis = AAY - this.Start.Y + ax;
  S = this.Size;
  A = this.Axis;
}

EdIntegr.prototype.Draw = function (P) {
  if ((this.Start.X != P.X) || (this.Start.Y != P.Y)) {
    this.Start = P;
    PreCalc(this.Start, this.Size, this.Axis);
  }
  var pOldElement = this.pOwner.pPaintedElement;
  this.pOwner.pPaintedElement = this;
  this.pIntegalSign.Draw(this.pIntegalSign.Start);
  this.pAA.Draw(this.pAA.Start);
  this.pDD.Draw(this.pDD.Start);
  this.pBB.Draw(this.pBB.Start);
  this.pOwner.pPaintedElement = pOldElement;
}

EdIntegr.prototype.GetFragment = function () {
  if (this.Selected) {
    return Write() + '&';
  } else {
    return this.pAA.GetFragment() + this.pDD.GetFragment() + this.pBB.GetFragment();
  }
}

EdIntegr.prototype.SelectFragment = function (FRect) {
  if (InRect(FRect) && ((this.Start.X + 3) > FRect.left())) {
    this.Selected = true;
    this.pAA.Select();
    this.pBB.Select();
    this.pDD.Select();
    return;
  }
  EdTwo.prototype.SelectFragment(FRect);
  this.pDD.SelectFragment(FRect);
}

EdIntegr.prototype.MoveToNext = function (pL) {
  if (pL.pSub_L == this.pAA) {
    pL.pSub_L = this.pBB;
    pL.pSub_L.pCurr = this.pBB.pFirst;
    return true;
  } else {
    return false;
  }
}

EdIntegr.prototype.MoveToPrev = function (pL) {
  if (pL.pSub_L == this.pBB) {
    pL.pSub_L = this.pAA;
    pL.pSub_L.pCurr = null;
    return true;
  } else {
    return false;
  }
}

EdIntegr.prototype.MoveInLeft = function (pL) {
  pL.pSub_L = this.pBB;
  pL.pSub_L.pCurr = null;
  return true;
}

EdIntegr.prototype.MoveInRight = function (pL) {
  pL.pSub_L = this.pAA;
  pL.pSub_L.pCurr = this.pAA.pFirst;
  return true;
}

EdIntegr.prototype.SWrite = function () {
  return "\\int{" + this.pAA.SWrite() + "}{" + this.pBB.SWrite() + '}';
}

EdLg.prototype.SetCurrent = function (C, pSL, pCr) {
      pSL.p = this.pNN;
    var pCurr = {
        p: this.pAA.pCurr
    };
  if (pSL.p.SetCurrent(C, pSL, pSL.p.pCurr)) {
    pCr.p = null;
  } else if ((this.pNN.pFirst == null) &&
    (this.pNN.Start.X <= C.X) &&
    (this.pNN.Start.X + this.pNN.Size.width >= C.X) &&
    (this.pNN.Start.Y <= C.Y) &&
    (this.pNN.Start.Y + this.pNN.Size.height >= C.Y)) {
    pCr.p = null;
  } else {
    pSL.p = this.pAA;
    if (pSL.p.SetCurrent(C, pSL, pSL.p.pCurr)) {
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
  var P1 = new TPoint(0, 0),
    P2 = new TPoint(0, 0),
    PN = new TPoint(0, 0),
    S1 = new QSize(0, 0),
    SN = new QSize(0, 0);
  this.Start = P;
  PN = P;
  this.pNN.PreCalc(PN, SN, this.pNN.Axis);
  P1.X = PN.X + SN.width + 4; //���������� ����� Lg
  P1.Y = PN.Y;
  this.pAA.PreCalc(P1, S1, this.pAA.Axis);
  if ((this.pNN.Axis) < (this.pAA.Axis)) {
    PN.Y += this.pAA.Axis - this.pNN.Axis;
    this.pNN.PreCalc(PN, SN, this.pNN.Axis);
  }
  if ((this.pAA.Axis) < (this.pNN.Axis)) {
    P1.Y += this.pNN.Axis - this.pAA.Axis;
    this.pAA.PreCalc(P1, S1, this.pAA.Axis);
  }
  this.Size.width = (P1.X + S1.width);

  this.Size.width = (this.Size.width - this.Start.X);
  this.Size.width = (this.Size.width + 4);
  this.Size.height = (P1.Y + S1.height);

  this.Size.height = (this.Size.height - this.Start.Y);

  P2 = this.pAA.Start;
  this.pB1.PreCalc(P2, this.pB1.Size, this.pB1.Axis);
  this.pB1.pFirst.pMember.Size.height = (this.pAA.Size.rheight);
  this.Size.width = (this.Size.width + this.pOwner.CharWidth('('));

  this.pAA.Start.X = this.pAA.Start.X + this.pOwner.CharWidth('(');
  this.pAA.PreCalc(this.pAA.Start, this.pAA.Size, this.pAA.Axis);

  P2.Y = this.pAA.Start.Y;
  P2.X = this.pAA.Start.X + this.pAA.Size.width;
  this.pB2.PreCalc(P2, this.pB2.Size, this.pB2.Axis);
  this.pB2.pFirst.pMember.Size.height = (this.pAA.Size.height);
  this.Size.width = (this.Size.width + this.pOwner.CharWidth(')'));

  this.Axis = P1.Y - this.Start.Y + this.pAA.Axis;
  S = this.Size;
  A = this.Axis;
}

EdLg.prototype.Draw = function (P) {
  if ((this.Start.X != P.X) || (this.Start.Y != P.Y)) {
    this.Start = P;
    PreCalc(this.Start, this.Size, this.Axis);
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
  this.Selected = (this.pNN.Selected && this.pB1.Selected && this.pAA.Selected);
}

EdLg.prototype.GetFragment = function () {
  if (this.Selected) return Write() + '&';
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
  if (pL.pSub_L == this.pNN) {
    pL.pSub_L = this.pAA;
    pL.pSub_L.pCurr = this.pAA.pFirst;
    return true;
  } else {
    return false;
  }
}

EdLg.prototype.MoveToPrev = function (pL) {
  if (pL.pSub_L == this.pAA) {
    pL.pSub_L = this.pNN;
    pL.pSub_L.pCurr = this.pNN.pLast;
    return true;
  } else {
    return false;
  }
}

EdLg.prototype.SWrite = function () {
  return "\\" + this.pNN.SWrite() + '{' + this.pAA.SWrite() + '}'; //���� ������ 28.10.2015
}

EdMatr.prototype.PreCalc = function (P, S, A) {
  var index;
  EdAbs.PreCalc(P, S, A);
  this.pOwner.RecalcSpaces = true;
  EdAbs.PreCalc(P, S, A);
  index = this.pAA.pFirst;
  while (index) {
    if (index.StrSeparat()) {
      this.Axis = this.Size.height / 2;
      break;
    }
    index = index.pNext;
  }
  S = this.Size;
  A = this.Axis;
}

EdMatr.prototype.Draw = function (P) {
  EdAbs.prototype.Draw(P);
  this.pAA.Draw(this.pAA.Start);
  var pOldElement = this.pOwner.pPaintedElement;
  this.pOwner.pPaintedElement = this;

  if (!this.IsVisible) return;


  this.pOwner.Line(this.Start.X + 4, this.Start.Y, this.Start.X + 8, this.Start.Y);
  this.pOwner.Line(this.Start.X + 4, this.Start.Y + this.Size.height - 1, this.Start.X + 8, this.Start.Y + this.Size.height - 1);
  this.pOwner.Line(this.pAA.Start.X + this.pAA.Size.width + 4, this.Start.Y, this.pAA.Start.X + this.pAA.Size.width, this.Start.Y);
  this.pOwner.Line(this.pAA.Start.X + this.pAA.Size.width + 4, this.Start.Y + this.Size.height - 1, this.pAA.Start.X + this.pAA.Size.width, this.Start.Y + this.Size.height - 1);

  this.pOwner.pPaintedElement = pOldElement;
}

EdMatr.prototype.Write = function () {
  return '(' + MatrName + '(' + this.pAA.Write() + "))";
}

EdMatr.prototype.SWrite = function () {
  var SWriteMode = "Matrix";
  return "\\matrix{" + this.pAA.SWrite() + '}';
  //SWriteMode = "";
}

// ������
EdLimit.prototype.SetCurrent = function (C, pSL, pCr) {
      pSL.p = this.pAA;
    var pCurr = {
        p: this.pAA.pCurr
    };
  if (pSL.p.SetCurrent(C, pSL, pSL.p.pCurr)) {
    pCr.p = pSL.p.pCurr;
  } else {
    if ((this.pAA.pFirst == null) &&
      (this.pAA.Start.X <= C.X) &&
      (this.pAA.Start.X + this.pAA.Size.width >= C.X) &&
      (this.pAA.Start.Y <= C.Y) &&
      (this.pAA.Start.Y + this.pAA.Size.height >= C.Y)) {
      pCr.p = null;
    } else {
      pSL.p = this.pVL;
      if (pSL.p.SetCurrent(C, pSL, pSL.p.pCurr)) {
        pCr.p = pSL.p.pCurr;
      } else {
        if ((pSL.p.pFirst == null) &&
          (pSL.p.Start.X <= C.X) &&
          (pSL.p.Start.X + pSL.p.Size.width >= C.X) &&
          (pSL.p.Start.Y <= C.Y) &&
          (pSL.p.Start.Y + pSL.p.Size.height >= C.Y)) {
          pCr.p = null;
        } else {
          pSL.p = this.pEE;
          if (pSL.p.SetCurrent(C, pSL, pSL.p.pCurr)) {
            pCr.p = pSL.p.pCurr;
          } else {
            if ((pSL.p.pFirst == null) &&
              (pSL.p.Start.X <= C.X) &&
              (pSL.p.Start.X + pSL.p.Size.width >= C.X) &&
              (pSL.p.Start.Y <= C.Y) &&
              (pSL.p.Start.Y + pSL.p.Size.height >= C.Y)) {
              pCr.p = null;
            } else {
              pSL.p = this.pAA;
            }
          }
        }
      }
    }
  }
  return true;
}

EdLimit.prototype.PreCalc = function (P, S, A) {
  var P1 = new TPoint(0, 0),
    PL = new TPoint(0, 0),
    PV = new TPoint(0, 0),
    PN = new TPoint(0, 0),
    PR = new TPoint(0, 0),
    S1 = new QSize(0, 0),
    SL = new QSize(0, 0),
    SV = new QSize(0, 0),
    SN = new QSize(0, 0),
    SR = new QSize(0, 0),

    var dx = 0,
      by = 0,
      ax = 0;
  var BaseLevel = this.pOwner.DrawingPower == 0;
  this.Start = P;
  PN = P;
  this.pNN.PreCalc(PN, SN, this.pNN.Axis);

  P1.X = PN.X + SN.width + 4;
  P1.Y = PN.Y;
  this.pAA.PreCalc(P1, S1, this.pAA.Axis);

  /*if (this.pNN.Axis < this.pAA.Axis)
    {
    P1.Y+=this.pNN.Axis-this.pAA.Axis;
    this.pAA.PreCalc(P1, S1, this.pAA.Axis);
    }*/
  by = PN.Y + SN.height + 3;

  this.pOwner.SetPowerSize(-1, BaseLevel);

  PV.X = P.X;
  PV.Y = by;
  this.pVL.PreCalc(PV, SV, this.pVL.Axis);

  PR.X = PV.X + SV.width;
  PR.Y = by;
  this.pRR.PreCalc(PR, SR, this.pRR.Axis);

  pL.pSub_L.X = PR.X + SR.width;
  pL.pSub_L.Y = by;
  this.pEE.PreCalc(PL, SL, this.pEE.Axis);

  ax = max((max(this.pVL.Axis, this.pRR.Axis)), this.pEE.Axis);
  /* if (this.pVL.Axis < ax)
     {
     PV.Y+=ax-this.pVL.Axis;
     this.pVL.PreCalc(PV, SV, this.pVL.Axis);
     }
   if (this.pRR.Axis < ax)
     {
     PR.Y+=ax-this.pRR.Axis;
     this.pRR.PreCalc(PR, SR, this.pRR.Axis);
     }
   if (this.pEE.Axis < ax)
     {
     pL.pSub_L.Y+=ax-this.pEE.Axis;
     this.pEE.PreCalc(PL, SL, this.pEE.Axis);
     }*/

  dx = pL.pSub_L.X + SL.width - PV.X;

  /*if (dx < SN.width)
    {
    PV.X+=(SN.width - dx)/2;
    PR.X+=(SN.width - dx)/2;
    pL.pSub_L.X+=(SN.width - dx)/2;
    this.pVL.PreCalc(PV, SV, this.pVL.Axis);
    this.pRR.PreCalc(PR, SR, this.pRR.Axis);
    this.pEE.PreCalc(PL, SL, this.pEE.Axis);
    }*/

  this.pOwner.SetPowerSize(+1, BaseLevel);

  /* if (dx > SN.width)
     {
     PN.X+=(dx-SN.width)/2;
     P1.X+=dx - SN.width;
     this.pNN.PreCalc(PN, SN, this.pNN.Axis);
     this.pAA.PreCalc(P1, S1, this.pAA.Axis);
     }*/

  this.Size.width = (Math.max(P1.X + S1.width, pL.pSub_L.X + SL.width));
  this.Size.width = (this.Size.width - this.Start.X);
  this.Size.width = (this.Size.width + 4);
  //this.Size.height = (max (PV.Y + SV.height, PR.Y + SR.height));
  //this.Size.height = (max ( max (PV.Y + SV.height, PR.Y + SR.height) , pL.pSub_L.Y + SL.height));
  this.Size.height = (Math.max((Math.max(Math.max(PV.Y + SV.height, PR.Y + SR.height), pL.pSub_L.Y + SL.height)), P1.Y + S1.height));
  this.Size.height = (this.Size.height - this.Start.Y);
  this.Axis = P1.Y - this.Start.Y + this.pAA.Axis;
  S = this.Size;
  A = this.Axis;
}

EdLimit.prototype.Draw = function (P) {
  var arX1, arY1, arX2, arY2;

  if (this.Start.X != P.X || this.Start.Y != P.Y) {
    this.Start = P;
    PreCalc(this.Start, this.Size, this.Axis);
  }
  var pOldElement = this.pOwner.pPaintedElement;
  this.pOwner.pPaintedElement = this;
  var BaseLevel = this.pOwner.DrawingPower == 0;
  this.pNN.Draw(this.pNN.Start);
  this.pAA.Draw(this.pAA.Start);

  this.pOwner.SetPowerSize(-1, BaseLevel);
  this.pVL.Draw(this.pVL.Start);
  this.pEE.Draw(this.pEE.Start);
  this.pOwner.SetPowerSize(+1, BaseLevel);

  DefineArrow(this.pRR.Start.X + 2, this.pRR.Start.Y + this.pRR.Axis, this.pRR.Start.X + this.pRR.Size.width - 2,
    this.pRR.Start.Y + this.pRR.Axis, arLim, arX1, arY1, arX2, arY2);



  this.pOwner.Line(this.pRR.Start.X + 2, this.pRR.Start.Y + this.pRR.Axis, this.pRR.Start.X + this.pRR.Size.width - 2, this.pRR.Start.Y + this.pRR.Axis);
  this.pOwner.Line(arX1, arY1, this.pRR.Start.X + this.pRR.Size.width - 2, this.pRR.Start.Y + this.pRR.Axis);
  this.pOwner.Line(arX2, arY2, this.pRR.Start.X + this.pRR.Size.width - 2, this.pRR.Start.Y + this.pRR.Axis);
  this.pOwner.pPaintedElement = pOldElement;
}

EdLimit.prototype.GetFragment = function () {
  if (this.Selected) return Write() + '&';
  return this.pVL.GetFragment() + this.pEE.GetFragment() + this.pAA.GetFragment();
}

EdLimit.prototype.SelectFragment = function (FRect) {
  this.pNN.SelectFragment(FRect);
  this.pAA.SelectFragment(FRect);
  this.pVL.SelectFragment(FRect);
  this.pEE.SelectFragment(FRect);
  this.Selected = this.pNN.Selected;
  if (this.Selected) {
    this.pAA.Select();
    this.pVL.Select();
    this.pEE.Select();
  }
}

EdLimit.prototype.ClearSelection = function () {
  this.pAA.ClearSelection();
  this.pVL.ClearSelection();
  this.pEE.ClearSelection();
  this.pNN.ClearSelection();
  this.Selected = false;
}

EdLimit.prototype.Write = function () {
  return '(' + QByteArray(LimitName) + '(' + this.pAA.Write() + ',' + this.pVL.Write() + ',' + this.pEE.Write() + "))";
}

EdLimit.prototype.MoveInRight = function (pL) {
  pL.pSub_L = this.pVL;
  pL.pSub_L.pCurr = this.pVL.pFirst;
  return true;
}

EdLimit.prototype.MoveInLeft = function (pL) {
  pL.pSub_L = this.pAA;
  pL.pSub_L.pCurr = null;
  return true;
}

EdLimit.prototype.MoveToNext = function (pL) {
  if (pL.pSub_L == this.pVL) {
    pL.pSub_L = this.pEE;
    pL.pSub_L.pCurr = this.pEE.pFirst;
    return true;
  } else {
    if (pL.pSub_L == this.pEE) {
      pL.pSub_L = this.pAA;
      pL.pSub_L.pCurr = this.pAA.pFirst;
      return true;
    } else {
      return false;
    }
  }
}

EdLimit.prototype.MoveToPrev = function (pL) {
  if (pL.pSub_L == this.pAA) {
    pL.pSub_L = this.pEE;
    pL.pSub_L.pCurr = null;
    return true;
  } else {
    if (pL.pSub_L == this.pEE) {
      pL.pSub_L = this.pVL;
      pL.pSub_L.pCurr = null;
      return true;
    } else {
      return false;
    }
  }
}

EdLimit.prototype.MoveToUp = function (pL) {
  if (pL.pSub_L == this.pVL || pL.pSub_L == this.pEE) {
    pL.pSub_L = this.pAA;
    pL.pSub_L.pCurr = this.pAA.pFirst;
    return true;
  } else {
    return false;
  }
}

EdLimit.prototype.MoveToDown = function (pL) {
  if (pL.pSub_L == this.pAA) {
    pL.pSub_L = this.pEE;
    pL.pSub_L.pCurr = null;
    return true;
  } else {
    return false;
  }
}

EdLimit.prototype.SWrite = function () {
  return "\\lim{" + this.pVL.SWrite() + "}{" + this.pEE.SWrite() + "}{" + this.pAA.SWrite() + '}';
}

EdImUnit.prototype.PreCalc = function (P, S, A) {
  this.pAA.PreCalc(this.Start, this.Size, this.pAA.Axis);
  this.Axis = this.pAA.Axis;
  S = this.Size;
  A = this.Axis;
}

EdImUnit.prototype.Draw = function (P) {
  if (this.Start.X != P.X || this.Start.Y != P.Y) {
    this.Start = P;
  }
  this.pAA.Draw(this.Start);
}

EdImUnit.prototype.Write = function () {
  return QByteArray(1, msImUnit);
}

EdImUnit.prototype.SWrite = function () {
  return "\\im";
}

EdImUnit.prototype.MoveInRight = function (pL) {
  return false;
}
EdImUnit.prototype.MoveInLeft = function (pL) {
  return false;
}
// �����������
EdDeriv.prototype.PreCalc = function (P, S, A) {
  var P1 = new TPoint(0, 0),
    P2 = new TPoint(0, 0),
    PH = new TPoint(0, 0),
    PL = new TPoint(0, 0),
    S1 = new QSize(0, 0),
    S2 = new QSize(0, 0),
    SH = new QSize(0, 0),
    SL = new QSize(0, 0);

  this.Start = P;
  PH = this.Start;
  PH.X = this.Start.X + 3;
  this.pHD.PreCalc(PH, SH, this.pHD.Axis);

  P1.Y = this.Start.Y;
  P1.X = PH.X + SH.width + 2;
  this.pAA.PreCalc(P1, S1, this.pAA.Axis);

  /*if (this.pHD.Axis > this.pAA.Axis)
    {
    P1.Y+=this.pHD.Axis - this.pAA.Axis;
    this.pAA.PreCalc (P1, S1, this.pAA.Axis);
    }

    if (this.pAA.Axis > this.pHD.Axis)
    {
    PH.Y+=this.pAA.Axis - this.pHD.Axis;
    this.pHD.PreCalc (PH, SH, this.pHD.Axis);
    }*/

  pL.pSub_L.X = PH.X;
  pL.pSub_L.Y = Math.max(PH.Y + SH.height, P1.Y + S1.height) + 4;
  this.pLD.PreCalc(PL, SL, this.pLD.Axis);

  P2.X = pL.pSub_L.X + SL.width + 2;
  P2.Y = pL.pSub_L.Y;
  this.pBB.PreCalc(P2, S2, this.pBB.Axis);

  /*if (this.pLD.Axis > this.pBB.Axis)
    {
    P2.Y+=this.pLD.Axis - this.pBB.Axis;
    this.pBB.PreCalc (P2, S2, this.pBB.Axis);
    }

    if (this.pBB.Axis > this.pLD.Axis)
    {
    pL.pSub_L.Y+=this.pBB.Axis - this.pLD.Axis;
    this.pLD.PreCalc (PL, SL, this.pLD.Axis);
    }
    */
  if ((SH.width + S1.width) < (SL.width + S2.width)) {
    PH.X += (SL.width + S2.width - SH.width - S1.width) / 2;
    P1.X += (SL.width + S2.width - SH.width - S1.width) / 2;
    this.pHD.PreCalc(PH, SH, this.pHD.Axis);
    this.pAA.PreCalc(P1, S1, this.pAA.Axis);
  }

  if ((SH.width + S1.width) > (SL.width + S2.width)) {
    pL.pSub_L.X += (SH.width + S1.width - SL.width - S2.width) / 2;
    P1.X += (SH.width + S1.width - SL.width - S2.width) / 2;
    this.pLD.PreCalc(PL, SL, this.pLD.Axis);
    this.pBB.PreCalc(P2, S2, this.pBB.Axis);
  }

  this.Axis = Math.max(PH.Y + SH.height, P1.Y + S1.height) - this.Start.Y + 2;
  this.Size.width = (Math.max(SH.width + S1.width, SL.width + S2.width) + 8);
  this.Size.height = (Math.max(pL.pSub_L.Y + SL.width, P2.Y + S2.height) - this.Start.Y + 2);
  S = this.Size;
  A = this.Axis;
}

EdDeriv.prototype.Draw = function (P) {
  if (this.Start.X != P.X || this.Start.Y != P.Y) {
    this.Start = P;
    PreCalc(this.Start, this.Size, this.Axis);
  }

  this.pAA.Draw(this.pAA.Start);
  this.pBB.Draw(this.pBB.Start);
  this.pHD.Draw(this.pHD.Start);
  this.pLD.Draw(this.pLD.Start);
  var pOldElement = this.pOwner.pPaintedElement;
  this.pOwner.pPaintedElement = this;

  this.pOwner.Line(min(this.pHD.Start.X, this.pLD.Start.X), this.Start.Y + this.Axis,
    Math.max(this.pAA.Start.X + this.pAA.Size.width, this.pBB.Start.X + this.pBB.Size.width), this.Start.Y + this.Axis);

  this.pOwner.pPaintedElement = pOldElement;
}

EdDeriv.prototype.GetFragment = function () {
  if (this.Selected) return Write() + '&';
  return this.pHD.GetFragment() + this.pAA.GetFragment() + this.pBB.GetFragment();
}

EdDeriv.prototype.SelectFragment = function (FRect) {
  EdFrac.prototype.SelectFragment(FRect);
  if (this.Selected) {
    this.pHD.Select();
    this.pLD.Select();
    exit(0);
  }
  this.pHD.SelectFragment(FRect);
  this.pLD.SelectFragment(FRect);

  if (this.pHD.Selected && this.pLD.Selected) {
    this.pAA.Select();
    this.pBB.Select();
    this.Selected = true;
  }
}

EdDeriv.prototype.ClearSelection = function () {
  EdFrac.prototype.ClearSelection();
  this.pHD.ClearSelection();
  this.pLD.ClearSelection();
}

EdDeriv.prototype.Write = function () {
  return '(' + DerivName + '(' + this.pAA.Write() + ',' + this.pBB.Write() + "))";
}

EdDeriv.prototype.SWrite = function () {
  return "\\der{" + this.pAA.SWrite() + "}{" + this.pBB.SWrite() + "}";
}

EdPerCount.prototype.SetCurrent = function (C, pSL, pCr) {
      pSL.p = this.pCC;
    var pCurr = {
        p: this.pAA.pCurr
    };
  if (pSL.p.SetCurrent(C, pSL, pSL.p.pCurr)) {
    pCr.p = pSL.p.pCurr;
  } else {
    if ((this.pCC.pFirst == null) &&
      (this.pCC.Start.X <= C.X) &&
      (this.pCC.Start.X + this.pCC.Size.width >= C.X) &&
      (this.pCC.Start.Y <= C.Y) &&
      (this.pCC.Start.Y + this.pCC.Size.width >= C.Y)) {
      pCr.p = null;
    }
  }
  return true;
}

EdPerCount.prototype.PreCalc = function (P, S, A) {
  var P1 = new TPoint(0, 0),
    P2 = new TPoint(0, 0),
    S1 = new QSize(0, 0),
    S2 = new QSize(0, 0);

  this.Start = P;

  P1 = this.Start;
  this.pAA.PreCalc(P1, S1, this.pAA.Axis);

  P2.X = this.pAA.Start.X + S1.width;
  P2.Y = P1.Y;
  this.pCC.PreCalc(P2, S2, this.pCC.Axis);

  this.Size.width = (S1.rwidth + S2.rwidth + this.pOwner.CharWidth('-'));
  this.Size.height = (this.pCC.Start.Y + this.pCC.Size.height - this.Start.Y);

  if (this.pCC.Axis > this.pAA.Axis) {
    this.pAA.Start.Y = this.Start.Y + this.pCC.Axis - this.pAA.Axis;
    this.pAA.PreCalc(this.pAA.Start, this.pAA.Size, this.pAA.Axis);
  }
  P2 = this.pCC.Start;
  this.pB1.PreCalc(P2, this.pB1.Size, this.pB1.Axis);
  this.pB1.pFirst.pMember.Size.height = (this.pCC.Size.height);
  this.Size.width = (this.Size.width + this.pOwner.CharWidth('('));

  this.pCC.Start.X = this.pCC.Start.X + this.pOwner.CharWidth('(');
  this.pCC.PreCalc(this.pCC.Start, this.pCC.Size, this.pCC.Axis);

  P2.Y = this.pCC.Start.Y;
  P2.X = this.pCC.Start.X + this.pCC.Size.width;
  this.pB2.PreCalc(P2, this.pB2.Size, this.pB2.Axis);
  this.pB2.pFirst.pMember.Size.height = (this.pCC.Size.height);
  this.Size.width = (this.Size.width + this.pOwner.CharWidth(')'));

  this.Axis = this.pAA.Start.Y - this.Start.Y + this.pAA.Axis;

  S = this.Size;
  A = this.Axis;
}

EdPerCount.prototype.Draw = function (P) {
  if (this.Start.X != P.X || this.Start.Y != P.Y) {
    this.Start = P;
    PreCalc(this.Start, this.Size, this.Axis);
  }
  this.pAA.Draw(this.pAA.Start);
  this.pB1.Draw(this.pB1.Start);
  this.pCC.Draw(this.pCC.Start);
  this.pB2.Draw(this.pB2.Start);
}

EdPerCount.prototype.SelectFragment = function (FRect) {
  this.pAA.SelectFragment(FRect);
  this.pB1.SelectFragment(FRect);
  this.pCC.SelectFragment(FRect);
  this.pB2.SelectFragment(FRect);
  this.Selected = (this.pAA.Selected && this.pB1.Selected && this.pCC.Selected && this.pB2.Selected);
}

EdPerCount.prototype.ClearSelection = function () {
  this.pAA.ClearSelection();
  this.pB1.ClearSelection();
  this.pCC.ClearSelection();
  this.pB2.ClearSelection();
  this.Selected = false;
}

EdPerCount.prototype.GetFragment = function () {
  if (this.Selected) return Write() + '&';
  return this.pAA.GetFragment() + this.pB1.GetFragment() + this.pCC.GetFragment() + this.pB2.GetFragment();
}

EdPerCount.prototype.Write = function () {
  return "PerCount" + '(' + this.pCC.Write() + ")";
}

EdPerCount.prototype.MoveInRight = function (pL) {
  pL.pSub_L = this.pCC;
  pL.pSub_L.pCurr = this.pCC.pFirst;
  return true;
}

EdPerCount.prototype.MoveInLeft = function (pL) {
  pL.pSub_L = this.pCC;
  pL.pSub_L.pCurr = null;
  return true;
}

EdPerCount.prototype.MoveToNext = function (pL) {
  return false;
}

EdPerCount.prototype.MoveToPrev = function (pL) {
  return false;
}

EdPerCount.prototype.MoveToUp = function (pL) {
  return false;
}

EdPerCount.prototype.MoveToDown = function (pL) {
  return false;
}

EdPerCount.prototype.SWrite = function () {
  return "\\percount{" + this.pCC.SWrite() + '}';
}

EdBCoeff.prototype.SetCurrent = function (C, pSL, pCr) {
      pSL.p = this.pBB;
    var pCurr = {
        p: this.pAA.pCurr
    };
  if (pSL.p.SetCurrent(C, pSL, pSL.p.pCurr)) {
    pCr.p = pSL.p.pCurr;
  } else {
    if ((this.pBB.pFirst == null) &&
      (this.pBB.Start.X <= C.X) &&
      (this.pBB.Start.X + this.pBB.Size.width >= C.X) &&
      (this.pBB.Start.Y <= C.Y) &&
      (this.pBB.Start.Y + this.pBB.Size.height >= C.Y)) {
      pCr.p = null;
    } else {
      pSL.p = this.pCC;
      if (pSL.p.SetCurrent(C, pSL, pSL.p.pCurr)) {
        pCr.p = pSL.p.pCurr;
      } else {
        if ((this.pCC.pFirst == null) &&
          (this.pCC.Start.X <= C.X) &&
          (this.pCC.Start.X + this.pCC.Size.width >= C.X) &&
          (this.pCC.Start.Y <= C.Y) &&
          (this.pCC.Start.Y + this.pCC.Size.height >= C.Y)) {
          pCr.p = null;
        }
      }
    }
  }
  return true;
}

EdBCoeff.prototype.PreCalc = function (P, S, A) {
  var P1 = new TPoint(0, 0),
    P2 = new TPoint(0, 0),
    P3 = new TPoint(0, 0),
    S1 = new QSize(0, 0),
    S2 = new QSize(0, 0),
    S3 = new QSize(0, 0);

  var BaseLevel = this.pOwner.DrawingPower == 0;

  this.Start = P;

  P1 = this.Start;
  this.pAA.PreCalc(P1, S1, this.pAA.Axis);

  P2.X = this.pAA.Start.X + S1.width;
  P2.Y = P1.Y;
  this.pOwner.SetPowerSize(+1, BaseLevel);
  this.pBB.PreCalc(P2, S2, this.pBB.Axis);

  if (S1.height <= S2.height) {
    this.pAA.Start.Y += S2.height - (S1.height / 2);
  }

  if (S1.height > S2.height) {
    this.pAA.Start.Y += S1.height / 2;
  }

  if (this.pAA.Start.Y != P1.Y) {
    this.pAA.PreCalc(this.pAA.Start, this.pAA.Size, this.pAA.Axis);
    P1 = this.pAA.Start;
    S1 = this.pAA.Size;
  }

  this.pOwner.SetPowerSize(-1, BaseLevel);

  P3.X = this.pAA.Start.X + S1.width + this.pOwner.CharWidth('.'); //CharWidth('-') ����
  P3.Y = P1.Y;
  this.pOwner.SetPowerSize(-1, BaseLevel);
  this.pCC.PreCalc(P3, S3, this.pCC.Axis);

  if (S1.height <= S3.height) {
    this.pCC.Start.Y += S1.height / 2;
  }

  if (S1.height > S3.height) {
    this.pCC.Start.Y += S1.height - (S3.height / 2);
  }

  if (this.pCC.Start.Y != P3.Y) {
    this.pCC.PreCalc(this.pCC.Start, this.pCC.Size, this.pCC.Axis);
  }

  this.pOwner.SetPowerSize(+1, BaseLevel);

  this.Size.width = (S1.width + max(S2.width, S3.width) + this.pOwner.CharWidth('-') + 2); //CharWidth('-') ����
  this.Size.height = (this.pAA.Start.Y + this.pAA.Size.height - this.Start.Y + 20);
  this.Axis = this.pAA.Start.Y - this.Start.Y + this.pAA.Axis;

  S = this.Size;
  A = this.Axis;
}

EdBCoeff.prototype.Draw = function (P) {
  if ((this.Start.X != P.X) || (this.Start.Y != P.Y)) {
    this.Start = P;
    PreCalc(this.Start, this.Size, this.Axis);
  }
  var BaseLevel = this.pOwner.DrawingPower == 0;
  this.pAA.Draw(this.pAA.Start);
  this.pOwner.SetPowerSize(-1, BaseLevel);
  this.pBB.Draw(this.pBB.Start);
  this.pCC.Draw(this.pCC.Start);
  this.pOwner.SetPowerSize(+1, BaseLevel);
}

EdBCoeff.prototype.GetFragment = function () {
  if (this.pAA.Selected && (this.pBB.Selected || this.pCC.Selected)) return Write() + '&';
  return this.pAA.GetFragment() + this.pBB.GetFragment() + this.pCC.GetFragment();
}

EdBCoeff.prototype.Write = function () {
  if (this.pAA.Write() == "C")
    return "BinomCoeff" + '(' + this.pBB.Write() + ',' + this.pCC.Write() + ')';
  return "ACoeff" + '(' + this.pBB.Write() + ',' + this.pCC.Write() + ')';
}

EdBCoeff.prototype.MoveInRight = function (pL) {
  pL.pSub_L = this.pCC;
  pL.pSub_L.pCurr = this.pCC.pFirst;
  return true;
}

EdBCoeff.prototype.MoveInLeft = function (pL) {
  pL.pSub_L = this.pCC;
  pL.pSub_L.pCurr = null;
  return true;
}
EdBCoeff.prototype.MoveToNext = function (pL) {
  return false;
}
EdBCoeff.prototype.MoveToPrev = function (pL) {
  return false;
}
EdBCoeff.prototype.MoveToUp = function (pL) {
  if ((pL.pSub_L == this.pAA) || (pL.pSub_L == this.pCC)) {
    pL.pSub_L = this.pBB;
    pL.pSub_L.pCurr = null;
    return true;
  } else {
    return false;
  }
}
EdBCoeff.prototype.MoveToDown = function (pL) {
  if ((pL.pSub_L == this.pBB) || (pL.pSub_L == this.pAA)) {
    pL.pSub_L = this.pCC;
    pL.pSub_L.pCurr = null;
    return true;
  } else {
    return false;
  }
}

EdBCoeff.prototype.SWrite = function () {
  if (this.pAA.SWrite() == "C")
    return "\\bcoeff{" + this.pBB.SWrite() + "}{" + this.pCC.SWrite() + '}';
  return "\\acoeff{" + this.pBB.SWrite() + "}{" + this.pCC.SWrite() + '}';
}

// dimentions
EdFunc.prototype.SetCurrent = function (C, pSL, pCr) {
      pSL.p = this.pAA;
    var pCurr = {
        p: this.pAA.pCurr
    };
  if (pSL.p.SetCurrent(C, pSL, pSL.p.pCurr)) {
    pCr.p = pSL.p.pCurr;
  } else {
    if ((this.pAA.pFirst == null) &&
      (this.pAA.Start.X <= C.X) &&
      (this.pAA.Start.X + this.Size.width >= C.X) &&
      (this.pAA.Start.Y <= C.Y) &&
      (this.pAA.Start.Y + this.pAA.Size.height >= C.Y)) {
      pCr.p = null;
    } else {
      pSL.p = this.pBB;
      if (pSL.p.SetCurrent(C, pSL, pSL.p.pCurr)) {
        pCr.p = pSL.p.pCurr;
      } else {
        if ((this.pBB.pFirst == null) &&
          (this.pBB.Start.X <= C.X) &&
          (this.pBB.Start.X + this.Size.width >= C.X) &&
          (this.pBB.Start.Y <= C.Y) &&
          (this.pBB.Start.Y + this.pBB.Size.height >= C.Y)) {
          pCr.p = null;
        } else {
          pSL.p = this.pAA;
        }
      }
    }
  }
  return true;
}

EdFunc.prototype.PreCalc = function (P, S, A) {
  var P1 = new TPoint(0, 0),
    P2 = new TPoint(0, 0),
    P3 = new TPoint(0, 0),
    P4 = new TPoint(0, 0),
    S1 = new QSize(0, 0),
    S2 = new QSize(0, 0),
    S3 = new QSize(0, 0),
    S4 = new QSize(0, 0);

  this.Start = P;

  P1 = this.Start;
  this.pAA.PreCalc(P1, S1, this.pAA.Axis);

  P2.X = this.pAA.Start.X + S1.width;
  P2.Y = P1.Y;
  this.pB1.PreCalc(P2, S2, this.pB1.Axis);

  P3.X = this.pB1.Start.X + S2.width;
  P3.Y = P2.Y;
  this.pBB.PreCalc(P3, S3, this.pBB.Axis);

  P4.X = this.pBB.Start.X + S3.width;
  P4.Y = P3.Y;
  this.pB2.PreCalc(P4, S4, this.pB2.Axis);

  this.Size.width = (S1.width + S2.width + S3.width + S4.width);
  if (this.pAA.Size.height >= this.pBB.Size.height) {
    this.Size.setHeight = (this.pAA.Size.height);
    this.Axis = this.pAA.Axis;
  } else {
    this.Size.height = (this.pBB.Size.height);
    this.Axis = this.pBB.Axis;
    this.pB1.Size.setHeight = (this.Size.height);
    if (this.pB1.pFirst != null) {
      this.pB1.pFirst.Size.setHeight = (this.Size.height);
      this.pB1.pFirst.pMember.Size.setHeight = (this.Size.height);
    }
    this.pB2.Size.setHeight = (this.Size.height);
    if (this.pB2.pFirst != null) {
      this.pB2.pFirst.Size.setHeight = (this.Size.height);
      this.pB2.pFirst.pMember.Size.setHeight = (this.Size.height);
    }
    this.pAA.Start.Y = this.pAA.Start.Y + this.Axis - this.pAA.Axis;
    if (this.pAA.pFirst != null) {
      this.pAA.pFirst.pMember.Start.Y += this.Axis - this.pAA.pFirst.pMember.Axis;
      this.pAA.pFirst.Start.Y += this.Axis - this.pAA.pFirst.Axis;
    }
  }
  S = this.Size;
  A = this.Axis;
}

EdFunc.prototype.Draw = function (P) {
  if ((this.Start.X != P.X) || (this.Start.Y != P.Y)) {
    this.Start = P;
    PreCalc(this.Start, this.Size, this.Axis);
  }
  this.pAA.Draw(this.pAA.Start);
  this.pB1.Draw(this.pB1.Start);
  this.pBB.Draw(this.pBB.Start);
  this.pB2.Draw(this.pB2.Start);
}

EdFunc.prototype.Write = function () {
  return "func(" + this.pAA.Write() + ',' + this.pBB.Write() + ')';
}

EdFunc.prototype.MoveInRight = function (pL) {
  pL.pSub_L = this.pBB;
  pL.pSub_L.pCurr = this.pBB.pFirst;
  return true;
}

EdFunc.prototype.MoveInLeft = function (pL) {
  pL.pSub_L = this.pBB;
  pL.pSub_L.pCurr = null;
  return true;
}

EdFunc.prototype.MoveToNext = function (pL) {
  if (pL.pSub_L == this.pAA) {
    pL.pSub_L = this.pBB;
    pL.pSub_L.pCurr = this.pBB.pFirst;
    return true;
  } else {
    return false;
  }
}

EdFunc.prototype.MoveToPrev = function (pL) {
  if (pL.pSub_L == this.pBB) {
    pL.pSub_L = this.pAA;
    pL.pSub_L.pCurr = null;
    return true;
  } else {
    return false;
  }
}

EdFunc.prototype.ClearSelection = function () {
  EdTwo.prototype.ClearSelection();
  this.pB1.ClearSelection();
  this.pB2.ClearSelection();
  this.Selected = false;
}

EdFunc.prototype.SelectFragment = function (FRect) {
  EdTwo.prototype.SelectFragment(FRect);
  this.pB1.SelectFragment(FRect);
  this.pB2.SelectFragment(FRect);
  this.Selected = this.pAA.Selected && this.pBB.Selected && this.pB2.Selected;
}

EdFunc.prototype.GetFragment = function () {
  if (this.Selected) return Write() + '&';
  return this.pAA.GetFragment() + this.pBB.GetFragment() + this.pB1.GetFragment() + this.pB2.GetFragment();
}
// ���� �������

EdSyst.prototype.PreCalc = function (P, S, A) {
  var P1 = new TPoint(0, 0),
    S1 = new QSize(0, 0);
  var ax = 0;
  var OldFontSize = 0;
  this.Start = P;
  this.pAA.PreCalc(P, S1, this.pAA.Axis);
  ax = this.pOwner.CharHeight('W');
  // QFont Font(this.pOwner.pCanvas.font());
  // OldFontSize = Font.pointSize();
  if (S1.height > ax)
    if (S1.height / ax > 1.5)
      this.SystFontSize = Round(OldFontSize * 1.2 * S1.height / ax);
    else
      this.SystFontSize = Round(OldFontSize * 1.7 * S1.height / ax);
  else
    this.SystFontSize = Round(OldFontSize * 1.7);
  Font.setPointSize(this.SystFontSize); //��������� ������� ������
  Font.setBold(true); //��������� ����������� ����������
  //QFontMetrics FontMetrics(Font);
  this.SystSize = FontMetrics.ascent(); //���������� ������ ������
  //QSize Size = FontMetrics.size(Qt.prototype.TextSingleLine, QString(msSystem));
  this.Size.height = (Size.height);
  this.sY = this.Start.Y + (this.Size.height - S1.height) / 2;
  P1.X = P.X + Size.width + 2;
  P1.Y = this.sY;
  this.pAA.PreCalc(P1, S1, this.pAA.Axis);

  ax = this.pAA.Axis;
  if (ax > this.pAA.Axis) {
    P1.Y = this.sY + ax - this.pAA.Axis;
    this.pAA.PreCalc(P1, S1, this.pAA.Axis);
  }

  this.Size.width = (this.Size.width - this.Start.X);
  this.Axis = this.sY - this.Start.Y + ax;
  this.sY = this.Start.Y;
  this.sX = this.Start.X;
  S = this.Size;
  A = this.Axis;
}

EdSyst.prototype.Draw = function (P) {
  if ((this.Start.X != P.X) || (this.Start.Y != P.Y)) {
    this.Start = P;
    PreCalc(this.Start, this.Size, this.Axis);
  }
  var pOldElement = this.pOwner.pPaintedElement;
  this.pOwner.pPaintedElement = this;
  this.pAA.Draw(this.pAA.Start);
  // QFont Font(this.pOwner.pCanvas.font());
  var OldFont = Canvas.Font.Clone();
  // Font.setPointSize(this.SystFontSize);
  Canvas.setFont(this.Font);
  //QPen Pen = this.pOwner.pCanvas.pen(); // Owner.Canvas.Pen := Owner.EditSets.SignPen; 
  //Pen.setColor( this.pOwner.EditSets.this.SignColor );// Owner.Canvas.Pen.Color := Owner.EditSets.SignColor; 
  //this.pOwner.pCanvas.setPen(Pen);
  this.pOwner.TextOut(this.sX, this.sY + this.SystSize, QString(msSystem));
  Canvas.setFont(OldFont);
  this.pOwner.pPaintedElement = pOldElement;
}
/*EdSyst.prototype.PreCalc = function (TPoint P, QSize &S, uint &A)
  {
  TPoint P1;
  QSize S1;
  EdMemb *index;

  this.Start = P;
  r = 3;
  dx = r++;
  P1.X = this.Start.X + 2 * dx;
  P1.Y = this.Start.Y + 4;
  this.pAA.PreCalc (P1, S1, this.pAA.Axis);

  this.Size.setHeight (S1.height + 8);
  r = min (Round (S1.height/8), 14);
  if (r>3)
    {
    dx = r++;
    P1.X = this.Start.X + 2 * dx;
    this.pAA.PreCalc (P1, S1, this.pAA.Axis);
    }
  else
    {
    r = 3;
    }
  this.Size.setWidth (S1.width + 2 * dx + 4);
  this.Axis = P1.Y - this.Start.Y + this.pAA.Axis;
  index = this.pAA.pFirst;
  while (index != null)
    {
    if (index.StrSeparat())
      {
      this.Axis = this.Size.height/2;
      break;
      }
    index = index.pNext;
    }
  S = this.Size;
  A = this.Axis;
  }

EdSyst.prototype.Draw (TPoint P)
  {
  if (this.Start.X != P.X || this.Start.Y != P.Y)
    {
    this.Start = P;
    PreCalc (this.Start, this.Size, this.Axis);
    }
  var pOldElement = this.pOwner.pPaintedElement;
  this.pOwner.pPaintedElement = this;

  this.pAA.Draw (this.pAA.Start);
  QPen Pen = this.pOwner.pCanvas.pen();
  Pen.setColor( this.pOwner.EditSets.this.SignColor );
  Pen.setWidth (2);
  this.pOwner.pCanvas.setPen( Pen );

  this.pOwner.Line (this.Start.X + dx, this.Start.Y + r, this.Start.X + dx, this.Start.Y + this.Axis - r);
  this.pOwner.Line (this.Start.X + dx, this.Start.Y + this.Axis + r, this.Start.X + dx, this.Start.Y + this.Size.height - r);
  this.pOwner.pCanvas.drawArc (this.Start.X + dx, this.Start.Y, 2*r, 2*r , 60*16, 1600); 
  // ������ ���� ����������
  this.pOwner.pCanvas.drawArc (this.Start.X + dx, this.Start.Y + this.Size.height - 2 * r, 2*r, 2*r,- 60*16,- 1600);
  this.pOwner.pCanvas.drawArc (this.Start.X + dx - 2 * r, this.Start.Y + this.Axis - 2 * r, 2*r, 2*r,- 60*16,- 1600);
  this.pOwner.pCanvas.drawArc (this.Start.X + dx - 2 * r, this.Start.Y + this.Axis, 2*r, 2*r , 60*16, 1600);
  this.pOwner.pPaintedElement = pOldElement;
  } */

EdSyst.prototype.Write = function () {
  return '(' + SystName + '(' + this.pAA.Write() + "))";
}

EdSyst.prototype.SWrite = function () {
  return "\\system{" + this.pAA.SWrite() + '}';
}

//�������� � ��������
EdIndx.prototype.SetCurrent = function (C, pSL, pCr) {
      pSL.p = this.pAA;
    var pCurr = {
        p: this.pAA.pCurr
    };
  if (pSL.p.SetCurrent(C, pSL, pSL.p.pCurr)) {
    pCr.p = pSL.p.pCurr;
  } else {
    if ((this.pAA.pFirst == null) &&
      (this.pAA.Start.X <= C.X) &&
      (this.pAA.Start.X + this.pAA.Size.width >= C.X) &&
      (this.pAA.Start.Y <= C.Y) &&
      (this.pAA.Start.Y + this.pAA.Size.height >= C.Y)) {
      pCr.p = null;
    } else {
      pSL.p = this.pBB;
      if (pSL.p.SetCurrent(C, pSL, pSL.p.pCurr)) {
        pCr.p = pSL.p.pCurr;
      } else {
        if ((this.pBB.pFirst == null) &&
          (this.pBB.Start.X <= C.X) &&
          (this.pBB.Start.X + this.pBB.Size.width >= C.X) &&
          (this.pBB.Start.Y <= C.Y) &&
          (this.pBB.Start.Y + this.pBB.Size.height >= C.Y)) {
          pCr.p = null;
        } else {
          pSL.p = this.pAA;
        }
      }
    }
  }
  return true;
}

EdIndx.prototype.PreCalc = function (P, S, A) {
  var P2 = new TPoint(0, 0),
    P1 = new TPoint(0, 0);
  var S1 = new QSize(0, 0),
    S2 = new QSize(0, 0);
  var BaseLevel = this.pOwner.DrawingPower == 0;

  this.Start = P;

  P1 = this.Start;
  this.pAA.PreCalc(P1, S1, this.pAA.Axis);

  this.pOwner.SetPowerSize(-1, BaseLevel);
  P2.X = this.pAA.Start.X + S1.width;
  P2.Y = P1.Y;
  this.pBB.PreCalc(P2, S2, this.pBB.Axis);

  if (S1.height <= S2.height) {
    this.pBB.Start.Y += S1.height / 2;
  }
  if (S1.height > S2.height) {
    this.pBB.Start.Y += S1.height - (S2.height / 2);
  }
  if (this.pBB.Start.Y != P2.Y) {
    this.pBB.PreCalc(this.pBB.Start, this.pBB.Size, this.pBB.Axis);
  }
  this.pOwner.SetPowerSize(+1, BaseLevel);

  this.Size.width = (S1.width + S2.width + this.pOwner.CharWidth('-') / 3);
  this.Size.height = (this.pBB.Start.Y + this.pBB.Size.height - this.Start.Y);
  this.Axis = this.pAA.Start.Y - this.Start.Y + this.pAA.Axis;

  S = this.Size;
  A = this.Axis;
}

EdIndx.prototype.Draw = function (P) {
  if (this.Start.X != P.X || this.Start.Y != P.Y) {
    this.Start = P;
    PreCalc(this.Start, this.Size, this.Axis);
  }
  var BaseLevel = this.pOwner.DrawingPower == 0;
  this.pAA.Draw(this.pAA.Start);
  this.pOwner.SetPowerSize(-1, BaseLevel);
  this.pBB.Draw(this.pBB.Start);
  this.pOwner.SetPowerSize(+1, BaseLevel);
}

EdIndx.prototype.Write = function () {
  return this.pAA.Write() + '[' + this.pBB.Write() + ']';
}

EdIndx.prototype.MoveInRight = function (pL) {
  pL.pSub_L = this.pAA;
  pL.pSub_L.pCurr = this.pAA.pFirst;
  return true;
}

EdIndx.prototype.MoveInLeft = function (pL) {
  pL.pSub_L = this.pBB;
  pL.pSub_L.pCurr = null;
  return true;
}

EdIndx.prototype.MoveToNext = function (pL) {
  if (pL.pSub_L == this.pAA) {
    pL.pSub_L = this.pBB;
    pL.pSub_L.pCurr = this.pBB.pFirst;
    return true;
  } else {
    return false;
  }
}

EdIndx.prototype.MoveToPrev = function (pL) {
  if (pL.pSub_L == this.pBB) {
    pL.pSub_L = this.pAA;
    pL.pSub_L.pCurr = null;
    return true;
  } else {
    return false;
  }
}

EdIndx.prototype.MoveToUp = function (pL) {
  if (pL.pSub_L == this.pBB) {
    pL.pSub_L = this.pAA;
    pL.pSub_L.pCurr = null;
    return true;
  } else {
    return false;
  }
}

EdIndx.prototype.MoveToDown = function (pL) {
  if (pL.pSub_L == this.pAA) {
    pL.pSub_L = this.pBB;
    pL.pSub_L.pCurr = this.pBB.pFirst;
    return true;
  } else {
    return false;
  }
}

EdIndx.prototype.SWrite = function () {
  return "\\index{" + this.pAA.SWrite() + "}{" + this.pBB.SWrite() + '}';
}

//measured

EdMeas.prototype.SetCurrent = function (C, pSL, pCr) {
      pSL.p = this.pAA;
    var pCurr = {
        p: this.pAA.pCurr
    };
  if (pSL.p.SetCurrent(C, pSL, pSL.p.pCurr)) {
    pCr.p = pSL.p.pCurr;
  } else {
    if ((this.pAA.pFirst == null) &&
      (this.pAA.Start.X <= C.X) &&
      (this.pAA.Start.X + this.pAA.Size.width >= C.X) &&
      (this.pAA.Start.Y <= C.Y) &&
      (this.pAA.Start.Y + this.pAA.Size.height >= C.Y)) {
      pCr.p = null;
    } else {
      pSL.p = this.pBB;
      if (pSL.p.SetCurrent(C, pSL, pSL.p.pCurr)) {
        pCr.p = pSL.p.pCurr;
      } else {
        if ((this.pBB.pFirst == null) &&
          (this.pBB.Start.X <= C.X) &&
          (this.pBB.Start.X + this.pBB.Size.width >= C.X) &&
          (this.pBB.Start.Y <= C.Y) &&
          (this.pBB.Start.Y + this.pBB.Size.height >= C.Y)) {
          pCr.p = null;
        } else {
          pSL.p = this.pAA;
        }
      }
    }
  }
  return true;
}

EdMeas.prototype.CinMass = function () {
  if (C == msDegree || C == msMinute || C == '%')
    return true;
  else
    return false;
}

EdMeas.prototype.CheckDegMin = function () {
  EdMemb * this.pIndex;
  if (this.pBB.pFirst != null)
    DegMin = true;
  else
    DegMin = false;
  this.pIndex = this.pBB.pFirst;
  while (this.pIndex && DegMin) {
    DegMin = this.pIndex.ElChar(C) && CinMass();
    this.pIndex = this.pIndex.pNext;
  }
}

EdMeas.prototype.PreCalc = function (P, S, A) {
  var P1 = new TPoint(0, 0),
    P2 = new TPoint(0, 0),
    PO = new TPoint(0, 0),
    PC = new TPoint(0, 0),
    S1 = new QSize(0, 0),
    S2 = new QSize(0, 0),
    SO = new QSize(0, 0),
    SC = new QSize(0, 0);

  this.Start = P;
  CheckDegMin();
  P1 = this.Start;
  this.pAA.PreCalc(P1, S1, this.pAA.Axis);

  if (!DegMin) {
    PO.X = this.pAA.Start.X + S1.width;
    PO.Y = P1.Y;
    this.pOB.PreCalc(PO, SO, this.pOB.Axis);

    P2.X = this.pOB.Start.X + SO.width;
  } else {
    P2.X = this.pAA.Start.X + S1.width;
  }
  P2.Y = P1.Y;
  this.pBB.PreCalc(P2, S2, this.pBB.Axis);

  if (!DegMin) {
    PC.X = this.pBB.Start.X + S2.width;
    PC.Y = P1.Y;
    this.pCB.PreCalc(PC, SC, this.pCB.Axis);
  }
  this.Axis = Math.max(this.pAA.Axis, this.pBB.Axis);
  if (!DegMin) {
    this.Axis = max(this.Axis, this.pOB.Axis);
    this.Axis = max(this.Axis, this.pCB.Axis);
  }
  if (this.pAA.Axis < this.Axis) {
    P1.Y += this.Axis - this.pAA.Axis;
    this.pAA.PreCalc(P1, S1, this.pAA.Axis);
  }
  if (this.pBB.Axis < this.Axis) {
    P2.Y += this.Axis - this.pBB.Axis;
    this.pBB.PreCalc(P2, S2, this.pBB.Axis);
  }
  if (!DegMin) {
    if (this.pOB.Axis < this.Axis) {
      PO.Y += this.Axis - this.pOB.Axis;
      this.pOB.PreCalc(PO, SO, this.pOB.Axis);
    }
    if (this.pCB.Axis < this.Axis) {
      PC.Y += this.Axis - this.pCB.Axis;
      this.pCB.PreCalc(PC, SC, this.pCB.Axis);
    }
  }
  if (!DegMin) {
    this.Size.width = (this.pCB.Start.X + this.pCB.Size.width - this.Start.X + 3);
  } else {
    this.Size.width = (this.pBB.Start.X + this.pBB.Size.width - this.Start.X + 3);
  }
  this.Size.setHeight = (max(this.pAA.Start.Y + this.pAA.Size.height, this.pBB.Start.Y + this.pBB.Size.height));
  if (!DegMin) {
    this.Size.setHeight = (max(max(this.pAA.Start.Y + this.pAA.Size.height, this.pBB.Start.Y + this.pBB.Size.height), this.pOB.Start.Y + this.pOB.Size.height));
    this.Size.setHeight = (max(max(this.pAA.Start.Y + this.pAA.Size.height, this.pBB.Start.Y + this.pBB.Size.height), this.pCB.Start.Y + this.pCB.Size.height));
  }
  this.Size.setHeight = (this.Size.height - this.Start.Y + 1);

  S = this.Size;
  A = this.Axis;
}

EdMeas.prototype.Draw = function (P) {
  var x1 = x2 = y1 = y2 = 0;
  var pOldElement;

  if (this.Start.X != P.X || this.Start.Y != P.Y) {
    this.Start = P;
    PreCalc(this.Start, this.Size, this.Axis);
  }

  pOldElement = this.pOwner.pPaintedElement;
  this.pOwner.pPaintedElement = this;

  CheckDegMin();

  this.pAA.Draw(this.pAA.Start);
  this.pBB.Draw(this.pBB.Start);
  if (DegMin) return;

  x1 = this.pBB.Start.X - 5;
  y1 = this.pBB.Start.Y;
  x2 = this.pBB.Start.X + this.pBB.Size.width + 5;
  y2 = this.pBB.Start.Y + this.pBB.Size.height;
  this.pOwner.Line(x1, y1, x1, y2);
  this.pOwner.Line(x1, y1, x1 + 5, y1);
  this.pOwner.Line(x1, y2, x1 + 5, y2);
  this.pOwner.Line(x2, y1, x2, y2);
  this.pOwner.Line(x2, y1, x2 - 5, y1);
  this.pOwner.Line(x2, y2, x2 - 5, y2);
  this.pOwner.pPaintedElement = pOldElement;
}

EdMeas.prototype.Write = function () {
  if (this.pBB.Write() == "`�'" || this.pBB.Write() == "`�'")
    return this.pAA.Write() + this.pBB.Write();
  return '(' + this.pAA.Write() + '`' + this.pBB.Write() + "''" + ')';
}

EdMeas.prototype.MoveInRight = function (pL) {
  pL.pSub_L = this.pAA;
  pL.pSub_L.pCurr = this.pAA.pFirst;
  return true;
}

EdMeas.prototype.MoveInLeft = function (pL) {
  pL.pSub_L = this.pBB;
  pL.pSub_L.pCurr = null;
  return true;
}

EdMeas.prototype.MoveToNext = function (pL) {
  if (pL.pSub_L == this.pAA) {
    pL.pSub_L = this.pBB;
    pL.pSub_L.pCurr = this.pBB.pFirst;
    return true;
  } else {
    return false;
  }
}

EdMeas.prototype.MoveToPrev = function (pL) {
  if (pL.pSub_L == this.pBB) {
    pL.pSub_L = this.pAA;
    pL.pSub_L.pCurr = null;
    return true;
  } else {
    return false;
  }
}

EdMeas.prototype.SWrite = function () {
  if ((this.pBB.SWrite() == "`�'") || (this.pBB.SWrite() == "`�'")) //2.11.2015
    return this.pAA.SWrite() + this.pBB.SWrite();
  return "\\units{" + this.pAA.SWrite() + "}{" + this.pBB.SWrite() + '}'; //2.11.2015
}

//������� ��������

EdLog.prototype.ClearSelection = function () {
  this.pAA.ClearSelection();
  this.pBB.ClearSelection();
  this.pB1.ClearSelection();
  this.pB2.ClearSelection();
  this.pCC.ClearSelection();
  this.Selected = false;
}

EdLog.prototype.SelectFragment = function (FRect) {
  this.Selected = this.pBB.InRect(FRect) && (this.pAA.InRect(FRect) || this.pB1.InRect(FRect));
  if (this.Selected) {
    this.pAA.Selected;
    this.pBB.Selected;
    this.pB1.Selected;
    this.pB2.Selected;
    this.pCC.Selected;
    return;
  }
  this.pAA.SelectFragment(FRect);
  this.pBB.SelectFragment(FRect);
  this.pB1.SelectFragment(FRect);
  this.pB2.SelectFragment(FRect);
  this.pCC.SelectFragment(FRect);
}

EdLog.prototype.GetFragment = function () {
  if (this.Selected) return Write() + '&';
  return this.pAA.GetFragment() + this.pBB.GetFragment() + this.pB1.GetFragment() + this.pCC.GetFragment() + this.pB2.GetFragment();
}

EdLog.prototype.SetCurrent = function (C, pSL, pCr) {
      pSL.p = this.pAA;
    var pCurr = {
        p: this.pAA.pCurr
    };
  if (pSL.p.SetCurrent(C, pSL, pSL.p.pCurr)) {
    pCr.p = pSL.p.pCurr;
  } else {
    if ((this.pAA.pFirst == null) &&
      (this.pAA.Start.X <= C.X) &&
      (this.pAA.Start.X + this.pAA.Size.width >= C.X) &&
      (this.pAA.Start.Y <= C.Y) &&
      (this.pAA.Start.Y + this.pAA.Size.height >= C.Y)) {
      pCr.p = null;
    } else {
      pSL.p = this.pBB;
      if (pSL.p.SetCurrent(C, pSL, pSL.p.pCurr)) {
        pCr.p = pSL.p.pCurr;
      } else {
        if ((pSL.p.pFirst == null) &&
          (pSL.p.Start.X <= C.X) &&
          (pSL.p.Start.X + pSL.p.Size.width >= C.X) &&
          (pSL.p.Start.Y <= C.Y) &&
          (pSL.p.Start.Y + pSL.p.Size.height >= C.Y)) {
          pCr.p = null;
        } else {
          pSL.p = this.pCC;
          if (pSL.p.SetCurrent(C, pSL, pSL.p.pCurr)) {
            pCr.p = pSL.p.pCurr;
          } else {
            if ((pSL.p.pFirst == null) &&
              (pSL.p.Start.X <= C.X) &&
              (pSL.p.Start.X + pSL.p.Size.width >= C.X) &&
              (pSL.p.Start.Y <= C.Y) &&
              (pSL.p.Start.Y + pSL.p.Size.height >= C.Y)) {
              pCr.p = null;
            } else {
              pSL.p = this.pAA;
            }
          }
        }
      }
    }
  }
  return true;
}

EdLog.prototype.PreCalc = function (P, S, A) {
  var P1 = new TPoint(0, 0),
    P2 = new TPoint(0, 0),
    P3 = new TPoint(0, 0),
    S1 = new QSize(0, 0),
    S2 = new QSize(0, 0),
    S3 = new QSize(0, 0);

  var BaseLevel = this.pOwner.DrawingPower == 0;
  var ax = 0;

  this.Start = P;

  P1 = this.Start;
  this.pAA.PreCalc(P1, S1, this.pAA.Axis);

  this.pOwner.SetPowerSize(-1, BaseLevel);
  P2.X = this.pAA.Start.X + S1.width;
  P2.Y = P1.Y;
  this.pBB.PreCalc(P2, S2, this.pBB.Axis);

  if (S1.height <= S2.height) {
    this.pBB.Start.Y += S1.height / 2;
  }
  if (S1.height > S2.height) {
    this.pBB.Start.Y += S1.height - S1.height / 2;
  }

  if (this.pBB.Start.Y != P2.Y) {
    this.pBB.PreCalc(this.pBB.Start, this.pBB.Size, this.pBB.Axis);
  }

  P3.X = this.pBB.Start.X + this.pBB.Size.width;
  P3.Y = this.Start.Y;
  this.pOwner.SetPowerSize(+1, BaseLevel);
  this.pCC.PreCalc(P3, S3, this.pCC.Axis);

  this.Size.width = (S1.width + S2.width + S3.width + this.pOwner.CharWidth('-') / 3);
  this.Size.height = (this.pBB.Start.Y + this.pBB.Size.height - this.Start.Y);

  ax = Math.max(this.pBB.Axis, this.pCC.Axis);
  if (ax > this.pAA.Axis) {
    this.pAA.Start.Y = this.Start.Y + ax - this.pAA.Axis;
    this.pAA.PreCalc(this.pAA.Start, this.pAA.Size, this.pAA.Axis);
    if (this.pCC.Axis > this.pBB.Axis) {
      this.pOwner.SetPowerSize(-1, BaseLevel);
      this.pBB.Start.Y += ax - this.pAA.Axis;
      this.pBB.PreCalc(this.pBB.Start, this.pBB.Size, this.pBB.Axis);
      this.pOwner.SetPowerSize(+1, BaseLevel);
    } else {
      this.pCC.Start.Y += ax - this.pAA.Axis;
      this.pCC.PreCalc(this.pCC.Start, this.pCC.Size, this.pCC.Axis);
    }
    this.Size.height = (Math.max(this.pBB.Start.Y + this.pBB.Size.height, this.pCC.Start.Y + this.pCC.Size.height) - this.Start.Y);
  }
  P2 = this.pCC.Start;
  this.pB1.PreCalc(P2, this.pB1.Size, this.pB1.Axis);
  this.pB1.pFirst.pMember.Size.height = (this.pCC.Size.height);
  this.Size.width = (this.Size.width + this.pOwner.CharWidth('('));

  this.pCC.Start.X = this.pCC.Start.X + this.pOwner.CharWidth('(');
  this.pCC.PreCalc(this.pCC.Start, this.pCC.Size, this.pCC.Axis);

  P2.Y = this.pCC.Start.Y;
  P2.X = this.pCC.Start.X + this.pCC.Size.width;
  this.pB2.PreCalc(P2, this.pB2.Size, this.pB2.Axis);
  this.pB2.pFirst.pMember.Size.height = (this.pCC.Size.height);
  this.Size.width = (this.Size.width + this.pOwner.CharWidth(')'));

  this.Axis = this.pAA.Start.Y - this.Start.Y + this.pAA.Axis;

  S = this.Size;
  A = this.Axis;
}

EdLog.prototype.Draw = function (P) {
  var BaseLevel;
  if (this.Start.X != P.X || this.Start.Y != P.Y) {
    this.Start = P;
    PreCalc(this.Start, this.Size, this.Axis);
  }
  BaseLevel = this.pOwner.DrawingPower == 0;
  this.pAA.Draw(this.pAA.Start);

  this.pOwner.SetPowerSize(-1, BaseLevel);
  this.pBB.Draw(this.pBB.Start);
  this.pOwner.SetPowerSize(+1, BaseLevel);
  this.pB1.pFirst.pMember.Draw(this.pB1.Start);
  this.pCC.Draw(this.pCC.Start);
  this.pB2.pFirst.pMember.Draw(this.pB2.Start);
}

EdLog.prototype.Write = function () {
  return this.pAA.Write() + '(' + this.pBB.Write() + ',' + this.pCC.Write() + ')';
}

EdLog.prototype.MoveInRight = function (pL) {
  pL.pSub_L = this.pCC;
  pL.pSub_L.pCurr = this.pCC.pFirst;
  return true;
}

EdLog.prototype.MoveInRight = function (pL) {
  pL.pSub_L = this.pCC;
  pL.pSub_L.pCurr = null;
  return true;
}

EdLog.prototype.MoveToNext = function (pL) {
  if (pL.pSub_L == this.pAA) {
    pL.pSub_L = this.pBB;
    pL.pSub_L.pCurr = this.pBB.pFirst;
    return true;
  } else {
    if (pL.pSub_L == this.pBB) {
      pL.pSub_L = this.pCC;
      pL.pSub_L.pCurr = this.pCC.pFirst;
      return true;
    } else {
      return false;
    }
  }
}

EdLog.prototype.MoveToPrev = function (pL) {
  if (pL.pSub_L == this.pBB) {
    pL.pSub_L = this.pAA;
    pL.pSub_L.pCurr = this.pAA.pLast;
    return true;
  } else {
    if (pL.pSub_L == this.pCC) {
      pL.pSub_L = this.pBB;
      pL.pSub_L.pCurr = this.pBB.pLast;
      return true;
    } else {
      return false;
    }
  }
}

EdLog.prototype.MoveToDown = function (pL) {
  if (pL.pSub_L == this.pCC) {
    pL.pSub_L = this.pBB;
    pL.pSub_L.pCurr = this.pBB.pLast;
    return true;
  } else {
    return false;
  }
}

EdLog.prototype.MoveToUp = function (pL) {
  if (pL.pSub_L == this.pBB) {
    pL.pSub_L = this.pCC;
    pL.pSub_L.pCurr = this.pCC.pLast;
    return true;
  } else {
    return false;
  }
}

EdLog.prototype.SWrite = function () {
  return "\\log{" + this.pBB.SWrite() + "}{" + this.pCC.SWrite() + '}';
}

EdDfIntegr.prototype.SetCurrent = function (C, pSL, pCr) {
      pSL.p = this.pAA;
    var pCurr = {
        p: this.pAA.pCurr
    };
  if (pSL.p.SetCurrent(C, pSL, pSL.p.pCurr)) {
    pCr.p = pSL.p.pCurr;
  } else {
    if ((this.pAA.pFirst == null) &&
      (this.pAA.Start.X <= C.X) &&
      (this.pAA.Start.X + this.pAA.Size.width >= C.X) &&
      (this.pAA.Start.Y <= C.Y) &&
      (this.pAA.Start.Y + this.pAA.Size.height >= C.Y)) {
      pCr.p = null;
    } else {
      pSL.p = this.pBB;
      if (pSL.p.SetCurrent(C, pSL, pSL.p.pCurr)) {
        pCr.p = pSL.p.pCurr;
      } else {
        if ((this.pBB.pFirst == null) &&
          (this.pBB.Start.X <= C.X) &&
          (this.pBB.Start.X + this.pBB.Size.width >= C.X) &&
          (this.pBB.Start.Y <= C.Y) &&
          (this.pBB.Start.Y + this.pBB.Size.height >= C.Y)) {
          pCr.p = null;
        } else {
          pSL.p = this.pHL;
          if (pSL.p.SetCurrent(C, pSL, pSL.p.pCurr)) {
            pCr.p = pSL.p.pCurr;
          } else {
            if ((pSL.p.pFirst == null) &&
              (pSL.p.Start.X <= C.X) &&
              (pSL.p.Start.X + pSL.p.Size.width >= C.X) &&
              (pSL.p.Start.Y <= C.Y) &&
              (pSL.p.Start.Y + pSL.p.Size.height >= C.Y)) {
              pCr.p = null;
            } else {
              pSL.p = this.pLL;
              if (pSL.p.SetCurrent(C, pSL, pSL.p.pCurr)) {
                pCr.p = pSL.p.pCurr;
              } else {
                if ((pSL.p.pFirst == null) &&
                  (pSL.p.Start.X <= C.X) &&
                  (pSL.p.Start.X + pSL.p.Size.width >= C.X) &&
                  (pSL.p.Start.Y <= C.Y) &&
                  (pSL.p.Start.Y + pSL.p.Size.height >= C.Y)) {
                  pCr.p = null;
                } else {
                  pSL.p = this.pAA;
                }
              }
            }
          }
        }
      }
    }
  }
  return true;
}

EdDfIntegr.prototype.PreCalc = function (P, S, A) {
  var PL = new TPoint(0, 0),
    PH = new TPoint(0, 0),
    SL = new QSize(0, 0),
    SH = new QSize(0, 0),
    SInt = new QSize(0, 0);
  var PInt = P.Clone();
  var dX = dY = AInt = 0;
  EdIntegr.PreCalc(PInt, SInt, AInt);
  SInt = this.pIntegalSign.Size;
  var BaseLevel;
  BaseLevel = this.pOwner.DrawingPower == 0;
  PH = P.Clone();
  this.pOwner.SetPowerSize(+1, BaseLevel);
  this.pHL.PreCalc(PH, SH, this.pHL.Axis);
  pL.pSub_L = P.Clone();
  this.pOwner.SetPowerSize(-2, BaseLevel);
  this.pLL.PreCalc(PL, SL, this.pLL.Axis);
  this.pOwner.SetPowerSize(+1, BaseLevel);
  dX = Math.max(SH.width, Math.max(SInt.width, SL.width));
  if (SH.width < dX) {
    PH.X += (dX - SH.width) / 2;
    this.pOwner.SetPowerSize(+1, BaseLevel);
    this.pHL.PreCalc(PH, SH, this.pHL.Axis);
    this.pOwner.SetPowerSize(-1, BaseLevel);
  }
  if (SInt.width < dX) PInt.X += (dX - SInt.width) / 2;
  PInt.Y += SH.height + 2;
  EdIntegr.PreCalc(PInt, SInt, AInt);
  this.Start = P;
  if (SL.width < dX) pL.pSub_L.X += (dX - SL.width) / 2;
  pL.pSub_L.Y = PInt.Y + SInt.height + 2;
  this.pOwner.SetPowerSize(-1, BaseLevel);
  this.pLL.PreCalc(PL, SL, this.pLL.Axis);
  this.pOwner.SetPowerSize(+1, BaseLevel);
  dX = Math.max(SH.width, Math.max(SInt.width, SL.width));
  this.Size.width = (dX + PInt.X - this.Start.X);
  this.Size.height = (pL.pSub_L.Y + SL.height - this.Start.Y);
  this.Axis += PInt.Y - P.Y;
  S = this.Size;
  A = this.Axis;
}

EdDfIntegr.prototype.Draw = function (P) {
  var BaseLevel = this.pOwner.DrawingPower == 0;
  EdIntegr.prototype.Draw(P);
  this.pOwner.SetPowerSize(+1, BaseLevel);
  this.pHL.Draw(this.pHL.Start);
  this.pOwner.SetPowerSize(-2, BaseLevel);
  this.pLL.Draw(this.pLL.Start);
  this.pOwner.SetPowerSize(+1, BaseLevel);
}

EdDfIntegr.prototype.ClearSelection = function () {
  EdIntegr.prototype.ClearSelection();
  this.pHL.ClearSelection();
  this.pLL.ClearSelection();
  this.Selected = false;
}

EdDfIntegr.prototype.SelectFragment = function (FRect) {
  EdIntegr.prototype.SelectFragment(FRect);
  if (this.Selected) {
    this.pLL.Select();
    this.pHL.Select();
    return;
  }
  this.pLL.SelectFragment(FRect);
  this.pHL.SelectFragment(FRect);
  this.Selected = (this.pLL.Selected && this.pHL.Selected) || ((this.pLL.Selected || this.pHL.Selected) &&
    (this.pAA.Selected || this.pBB.Selected || this.pDD.Selected));
  if (this.Selected) {
    this.pLL.Select();
    this.pHL.Select();
    this.pAA.Select();
    this.pBB.Select();
    this.pDD.Select();
  }
}

EdDfIntegr.prototype.GetFragment = function () {
  if (this.Selected) return Write() + '&';
  return this.pAA.GetFragment() + this.pDD.GetFragment() + this.pBB.GetFragment();
}

EdDfIntegr.prototype.Write = function () {
  return '(' + IntegrName + '(' + this.pAA.Write() + ',' + this.pLL.Write() + ',' + this.pHL.Write() + ',' +
    this.pBB.Write() + "))";
}

EdDfIntegr.prototype.MoveInRight = function (pL) {
  pL.pSub_L = this.pHL;
  pL.pSub_L.pCurr = this.pHL.pFirst;
  return true;
}

EdDfIntegr.prototype.MoveToNext = function (pL) {
  if ((pL.pSub_L == this.pLL) || (pL.pSub_L == this.pHL)) {
    pL.pSub_L = this.pAA;
    pL.pSub_L.pCurr = this.pAA.pFirst;
    return true;
  } else {
    if (pL.pSub_L == this.pAA) {
      pL.pSub_L = this.pBB;
      pL.pSub_L.pCurr = this.pBB.pFirst;
      return true;
    } else {
      return false;
    }
  }
}

EdDfIntegr.prototype.MoveToPrev = function (pL) {
  if (pL.pSub_L == this.pBB) {
    pL.pSub_L = this.pAA;
    pL.pSub_L.pCurr = null;
    return true;
  } else {
    if (pL.pSub_L == this.pAA) {
      pL.pSub_L = this.pHL;
      pL.pSub_L.pCurr = null;
      return true;
    } else {
      return false;
    }
  }
}

EdDfIntegr.prototype.MoveToUp = function (pL) {
  if (pL.pSub_L == this.pLL) {
    pL.pSub_L = this.pAA;
    pL.pSub_L.pCurr = this.pAA.pFirst;
    return true;
  } else {
    if ((pL.pSub_L == this.pAA) || (pL.pSub_L == this.pBB)) {
      pL.pSub_L = this.pHL;
      pL.pSub_L.pCurr = null;
      return true;
    } else {
      return false;
    }
  }
}

EdDfIntegr.prototype.MoveToDown = function (pL) {
  if (pL.pSub_L == this.pHL) {
    pL.pSub_L = this.pAA;
    pL.pSub_L.pCurr = this.pAA.pFirst;
    return true;
  } else {
    if ((pL.pSub_L == this.pAA) || (pL.pSub_L == this.pBB)) {
      pL.pSub_L = this.pLL;
      pL.pSub_L.pCurr = null;
      return true;
    } else {
      return false;
    }
  }
}

EdDfIntegr.prototype.SWrite = function () {
  return "\\dint{" + this.pLL.SWrite() + "}{" + this.pHL.SWrite() + "}{" + this.pAA.SWrite() + "}{" + this.pBB.SWrite() + '}';
}

function EdGSumm(pOwn, Str) {
  EdElm.call(this, pOwn);

  this.pAA = new EdList(this.pOwner);
  this.pLL = new EdList(this.pOwner);
  this.pHL = new EdList(this.pOwner);

  this.Type = 'EdGSumm';
}

EdGSumm.prototype.SetCurrent = function (C, pSL, pCr) {
      pSL.p = this.pAA;
    var pCurr = {
        p: this.pAA.pCurr
    };
  if (pSL.p.SetCurrent(C, pSL, pSL.p.pCurr)) {
    pCr.p = pSL.p.pCurr;
  } else {
    if ((this.pAA.pFirst == null) &&
      (this.pAA.Start.X <= C.X) &&
      (this.pAA.Start.X + this.pAA.Size.width >= C.X) &&
      (this.pAA.Start.Y <= C.Y) &&
      (this.pAA.Start.Y + this.pAA.Size.height >= C.Y)) {
      pCr.p = null;
    } else {
      pSL.p = this.pHL;
      if (pSL.p.SetCurrent(C, pSL, pSL.p.pCurr)) {
        pCr.p = pSL.p.pCurr;
      } else {
        if ((pSL.p.pFirst == null) &&
          (pSL.p.Start.X <= C.X) &&
          (pSL.p.Start.X + pSL.p.Size.width >= C.X) &&
          (pSL.p.Start.Y <= C.Y) &&
          (pSL.p.Start.Y + pSL.p.Size.height >= C.Y)) {
          pCr.p = null;
        } else {
          pSL.p = this.pLL;
          if (pSL.p.SetCurrent(C, pSL, pSL.p.pCurr)) {
            pCr.p = pSL.p.pCurr;
          } else {
            if ((pSL.p.pFirst == null) &&
              (pSL.p.Start.X <= C.X) &&
              (pSL.p.Start.X + pSL.p.Size.width >= C.X) &&
              (pSL.p.Start.Y <= C.Y) &&
              (pSL.p.Start.Y + pSL.p.Size.height >= C.Y)) {
              pCr.p = null;
            } else {
              pSL.p = this.pAA;
            }
          }
        }
      }
    }
  }
  return true;
}

EdGSumm.prototype.PreCalc = function (P, S, A) {
  var PAA = new TPoint(0, 0),
    PL = new TPoint(0, 0),
    PH = new TPoint(0, 0),
    SAA = new QSize(0, 0),
    SL = new QSize(0, 0),
    SH = new QSize(0, 0),
    SSum = new QSize(0, 0);
  var PSum = P.Clone();

  var dX, dY, Axis;
  this.Start = P;
  this.pSign.PreCalc(P, SSum, Axis);
  this.pAA.PreCalc(P, SAA, this.pAA.Axis);
  var MaxH = SAA.height * 1.5;
  if (abs(Round(MaxH) - SSum.height) > 2) {
    this.pSign.RecalcSize(MaxH / SSum.height);
    this.pSign.PreCalc(P, SSum, Axis);
  }
  var BaseLevel;
  BaseLevel = this.pOwner.DrawingPower == 0;
  PH = P;
  this.pOwner.SetPowerSize(+1, BaseLevel);
  this.pHL.PreCalc(PH, SH, this.pHL.Axis);
  pL.pSub_L = P;
  this.pOwner.SetPowerSize(-2, BaseLevel);
  this.pLL.PreCalc(PL, SL, this.pLL.Axis);
  this.pOwner.SetPowerSize(+1, BaseLevel);
  dX = Math.max(SH.width, Math.max(SSum.width, SL.width));
  if (SH.width < dX) {
    PH.X += (dX - SH.width) / 2;
    this.pOwner.SetPowerSize(+1, BaseLevel);
    this.pHL.PreCalc(PH, SH, this.pHL.Axis);
    this.pOwner.SetPowerSize(-1, BaseLevel);
  }
  if (SSum.width < dX) PSum.X += (dX - SSum.width) / 2;
  PSum.Y += SH.height + 2;
  this.pSign.PreCalc(PSum, SSum, Axis);
  var AAY = PSum.Y + Axis - SAA.height / 2;
  PAA.X = PSum.X + this.pSign.Width + 2;
  PAA.Y = AAY;
  this.pAA.PreCalc(PAA, SAA, this.pAA.Axis);
  this.Axis = AAY + this.pAA.Axis;
  if (SL.width < dX) pL.pSub_L.X += (dX - SL.width) / 2;
  pL.pSub_L.Y = PSum.Y + SSum.height + 2;
  this.pOwner.SetPowerSize(-1, BaseLevel);
  this.pLL.PreCalc(PL, SL, this.pLL.Axis);
  this.pOwner.SetPowerSize(+1, BaseLevel);
  this.Size.width = (Math.max(PH.X + SH.width, Math.max(PAA.X + SAA.width, pL.pSub_L.X + SL.width)) - P.X);
  this.Size.height = (pL.pSub_L.Y + SL.height - P.Y);
  S = this.Size;
  A = this.Axis;
}

EdGSumm.prototype.Draw = function (P) {
  var BaseLevel = this.pOwner.DrawingPower == 0;
  if ((this.Start.X != P.X) || (this.Start.Y != P.Y)) {
    this.Start = P;
    PreCalc(this.Start, this.Size, this.Axis);
  }
  var pOldElement = this.pOwner.pPaintedElement;
  this.pOwner.pPaintedElement = this;
  this.pSign.Draw(this.pSign.Start);
  this.pAA.Draw(this.pAA.Start);
  this.pOwner.SetPowerSize(+1, BaseLevel);
  this.pHL.Draw(this.pHL.Start);
  this.pOwner.SetPowerSize(-2, BaseLevel);
  this.pLL.Draw(this.pLL.Start);
  this.pOwner.SetPowerSize(+1, BaseLevel);
  this.pOwner.pPaintedElement = pOldElement;
}

EdGSumm.prototype.Write = function () {
  return '(' + GSummName + '(' + this.pAA.Write() + ',' + this.pLL.Write() + ',' + this.pHL.Write() + ")";
}

EdGSumm.prototype.SelectFragment = function (FRect) {
  this.pAA.SelectFragment(FRect);
  this.pLL.SelectFragment(FRect);
  this.pHL.SelectFragment(FRect);
  this.Selected = (this.pAA.Selected && (this.pLL.Selected || this.pHL.Selected)) || (this.pLL.Selected && this.pHL.Selected);
  if (this.Selected) {
    this.pAA.Select();
    this.pHL.Select();
    this.pLL.Select();
  }
}

EdGSumm.prototype.GetFragment = function () {
  if (this.Selected) return Write() + '&';
  return this.pAA.GetFragment() + this.pHL.GetFragment() + this.pLL.GetFragment();
}

EdGSumm.prototype.ClearSelection = function () {
  this.pAA.ClearSelection();
  this.pHL.ClearSelection();
  this.pLL.ClearSelection();
}

EdGSumm.prototype.MoveInRight = function (pL) {
  pL.pSub_L = this.pHL;
  pL.pSub_L.pCurr = this.pHL.pFirst;
  return true;
}

EdGSumm.prototype.MoveInLeft = function (pL) {
  pL.pSub_L = this.pAA;
  pL.pSub_L.pCurr = null;
  return true;
}

EdGSumm.prototype.MoveToNext = function (pL) {
  if ((pL.pSub_L == this.pLL) || (pL.pSub_L == this.pHL)) {
    pL.pSub_L = this.pAA;
    pL.pSub_L.pCurr = this.pAA.pFirst;
    return true;
  } else {
    return false;
  }
}

EdGSumm.prototype.MoveToPrev = function (pL) {
  if (pL.pSub_L == this.pAA) {
    pL.pSub_L = this.pHL;
    pL.pSub_L.pCurr = null;
    return true;
  } else {
    return false;
  }
}

EdGSumm.prototype.MoveToUp = function (pL) {
  if (pL.pSub_L == this.pLL) {
    pL.pSub_L = this.pAA;
    pL.pSub_L.pCurr = this.pAA.pFirst;
    return true;
  } else {
    if (pL.pSub_L == this.pAA) {
      pL.pSub_L = this.pHL;
      pL.pSub_L.pCurr = null;
      return true;
    } else {
      return false;
    }
  }
}

EdGSumm.prototype.MoveToDown = function (pL) {
  if (pL.pSub_L == this.pHL) {
    pL.pSub_L = this.pAA;
    pL.pSub_L.pCurr = this.pAA.pFirst;
    return true;
  } else {
    if (pL.pSub_L == this.pAA) {
      pL.pSub_L = this.pLL;
      pL.pSub_L.pCurr = null;
      return true;
    } else {
      return false;
    }
  }
}

EdGSumm.prototype.SWrite = function () {
  return "\\summa{" + this.pLL.SWrite() + "}{" + this.pHL.SWrite() + "}{" + this.pAA.SWrite() + '}';
}

function EdGMult(pOwn) {
  EdGSumm.call(this, pOwn);
  this.Type = 'EdGMult';
}

EdGMult.prototype.Write = function () {
  return '(' + GMultName + '(' + this.pAA.Write() + ',' + this.pLL.Write() + ',' + this.pHL.Write() + "))";
}

EdGMult.prototype.SWrite = function () {
  return "\\product{" + this.pLL.SWrite() + "}{" + this.pHL.SWrite() + "}{" + this.pAA.SWrite() + '}';
}

// EdSubst.prototype.EdSubst(XPInEdit * pOwn): EdElm(pOwn), this.pAA(new EdList(this.pOwner)), this.pLL(new EdList(this.pOwner)),
//   this.pHL(new EdList(this.pOwner)) {}

EdSubst.prototype.PreCalc = function (P, S, A) {
  var P1 = new TPoint(0, 0),
    PL = new TPoint(0, 0),
    PH = new TPoint(0, 0),
    S1 = new QSize(0, 0),
    SL = new QSize(0, 0),
    SH = new QSize(0, 0);
  var dY;
  var BaseLevel = this.pOwner.DrawingPower == 0;
  this.Start = P;

  P1.X = this.Start.X;
  P1.Y = this.Start.Y + 2; //space in top
  this.pAA.PreCalc(P1, S1, this.pAA.Axis);

  this.PS.X = P1.X + S1.width + 3; // space after expression
  this.PS.Y = this.Start.Y;
  this.SS.width = (1);
  this.SS.setHeight = (S1.height + 4); //space in top & bottom

  PH.X = this.PS.X + 3;
  PH.Y = this.Start.Y;
  this.pOwner.SetPowerSize(+1, BaseLevel);
  this.pHL.PreCalc(PH, SH, this.pHL.Axis);

  pL.pSub_L.X = PH.X;
  pL.pSub_L.Y = PH.Y + SH.height + 2;
  this.pOwner.SetPowerSize(-2, BaseLevel);
  this.pLL.PreCalc(PL, SL, this.pLL.Axis);
  this.pOwner.SetPowerSize(+1, BaseLevel);

  dY = (pL.pSub_L.Y + SL.height) - (this.PS.Y + this.SS.height);

  if (dY < 0) {
    pL.pSub_L.Y -= dY;
    this.pOwner.SetPowerSize(-1, BaseLevel);
    this.pLL.PreCalc(PL, SL, this.pLL.Axis);
    this.pOwner.SetPowerSize(+1, BaseLevel);
  }

  if (dY > 0) {
    this.SS.setHeight = (this.SS.height + dY);
    P1.Y += dY / 2;
    this.pAA.PreCalc(P1, S1, this.pAA.Axis);
  }

  this.Size.width = (max(PH.X + SH.width, pL.pSub_L.X + SL.width));
  this.Size.width = (this.Size.width - this.Start.X);
  this.Size.width = (this.Size.width + 4); // space after Subst
  this.Size.setHeight = (pL.pSub_L.Y + SL.height - this.Start.Y);
  this.Axis = P1.Y - this.Start.Y + this.pAA.Axis;
  S = this.Size;
  A = this.Axis;
}

EdSubst.prototype.Draw = function (P) {
  var BaseLevel = this.pOwner.DrawingPower == 0;
  var pOldElement = this.pOwner.pPaintedElement;
  this.pOwner.pPaintedElement = this;
  if ((this.Start.X != P.X) || (this.Start.Y != P.Y)) {
    this.Start = P;
    PreCalc(this.Start, this.Size, this.Axis);
  }
  this.pAA.Draw(this.pAA.Start);

  //QPen Pen = this.pOwner.pCanvas.pen(); // Owner.Canvas.Pen := Owner.EditSets.SignPen; 
  //Pen.width = (1);
  //this.pOwner.pCanvas.setPen(Pen);

  this.pOwner.Line(this.PS.X, this.PS.Y, this.PS.X, this.PS.Y + this.SS.height);
  this.pOwner.SetPowerSize(+1, BaseLevel);
  this.pHL.Draw(this.pHL.Start);
  this.pOwner.SetPowerSize(-2, BaseLevel);
  this.pLL.Draw(this.pLL.Start);
  this.pOwner.SetPowerSize(+1, BaseLevel);
  this.pOwner.pPaintedElement = pOldElement;
}

EdSubst.prototype.Write = function () {
  return '(' + SubstName + '(' + this.pAA.Write() + ',' + this.pLL.Write() + ',' + this.pHL.Write() + "))";
}

EdSubst.prototype.MoveInRight = function (pL) {
  pL.pSub_L = this.pAA;
  pL.pSub_L.pCurr = this.pAA.pFirst;
  return true;
}

EdSubst.prototype.MoveInRight = function (pL) {
  pL.pSub_L = this.pHL;
  pL.pSub_L.pCurr = null;
  return true;
}

EdSubst.prototype.MoveToNext = function (pL) {
  if (pL.pSub_L == this.pAA) {
    pL.pSub_L = this.pHL;
    pL.pSub_L.pCurr = this.pHL.pFirst;
    return true;
  } else {
    return false;
  }
}

EdSubst.prototype.MoveToPrev = function (pL) {
  if ((pL.pSub_L == this.pLL) || (pL.pSub_L == this.pHL)) {
    pL.pSub_L = this.pAA;
    pL.pSub_L.pCurr = null;
    return true;
  } else {
    return false;
  }
}

EdSubst.prototype.MoveToUp = function (pL) {
  if (pL.pSub_L == this.pLL) {
    pL.pSub_L = this.pAA;
    pL.pSub_L.pCurr = null;
    return true;
  } else {
    if (pL.pSub_L == this.pAA) {
      pL.pSub_L = this.pHL;
      pL.pSub_L.pCurr = this.pHL.pFirst;
      return true;
    } else {
      return false;
    }
  }
}

EdSubst.prototype.MoveToDown = function (pL) {
  if (pL.pSub_L == this.pHL) {
    pL.pSub_L = this.pAA;
    pL.pSub_L.pCurr = null;
    return true;
  } else {
    if (pL.pSub_L == this.pAA) {
      pL.pSub_L = this.pLL;
      pL.pSub_L.pCurr = this.pLL.pFirst;
      return true;
    } else {
      return false;
    }
  }
}

EdSubst.prototype.SWrite = function () {
  return "\\subst{" + this.pAA.SWrite() + "}{" + this.pLL.SWrite() + "}{" + this.pHL.SWrite() + '}';
}