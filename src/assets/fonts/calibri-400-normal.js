﻿import { jsPDF } from "jspdf"
var callAddFont = function () {
this.addFileToVFS('calibri-400-normal.ttf', font);
this.addFont('calibri-400-normal.ttf', 'calibri-400', 'normal');
};
jsPDF.API.events.push(['addFonts', callAddFont])