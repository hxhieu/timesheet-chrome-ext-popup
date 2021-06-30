import { Control } from '@babylonjs/gui/2D/controls/control';
import { StackPanel } from '@babylonjs/gui/2D/controls/stackPanel';
import { TextBlock } from '@babylonjs/gui/2D/controls/textBlock';
import { getGui } from '../../../gui';
import { ITimesheet } from '../../../types';
import { getFontString } from '../../../utils/babylonjs/gui';

let _entryDetail: GuiEntryDetail;

class GuiEntryDetail extends Control {
  private _panel: StackPanel;
  private _txtProject: TextBlock;
  private _txtTime: TextBlock;
  private _txtDesc: TextBlock;
  private _txtCharged: TextBlock;
  private _lineHeight = '18px';
  private _projectColours: { [key: number]: string };

  public constructor(name: string, projectColours: { [key: number]: string }, addControl: (control: Control) => void) {
    super(name);

    this._projectColours = projectColours;

    const panel = new StackPanel(name);
    panel.background = 'white';
    panel.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
    addControl(panel);

    const paddingTop = this.createLabel(`${name}_padding_top`);
    paddingTop.height = '8px';
    panel.addControl(paddingTop);

    this._txtProject = this.createLabel(`${name}_txt_project`);
    panel.addControl(this._txtProject);

    const timePanel = new StackPanel(`${name}_time_pane`);

    timePanel.isVertical = false;
    timePanel.height = this._lineHeight;
    panel.addControl(timePanel);

    this._txtTime = this.createLabel(`${name}_txt_time`);
    this._txtTime.width = '0px';
    timePanel.addControl(this._txtTime);

    this._txtCharged = this.createLabel(`${name}_txt_charged`, 'red');
    this._txtCharged.width = '0px';
    timePanel.addControl(this._txtCharged);

    this._txtDesc = this.createLabel(`${name}_txt_time`);
    this._txtDesc.fontSize = '12px';
    panel.addControl(this._txtDesc);

    const paddingBottom = this.createLabel(`${name}_padding_bottom`);
    paddingBottom.height = '8px';
    panel.addControl(paddingBottom);

    this._panel = panel;
    this._panel.isVisible = false;
  }

  public setEntry = (entry?: ITimesheet) => {
    this._panel.isVisible = !!entry;
    if (!entry) {
      return;
    }
    this.setTime(entry);
    const { ProjectName, ProjectId, Description } = entry;
    this._txtProject.text = `${ProjectId} - ${ProjectName}`;
    this._txtProject.color = this._projectColours[ProjectId];
    this._txtDesc.text = Description;
  };

  private setTime = (entry: ITimesheet) => {
    const { StartText, EndText, Charge } = entry;
    this._txtTime.text = `${StartText} - ${EndText}`;
    this._txtCharged.text = Charge || 'Charged';
    this._txtCharged.color = Charge === 'N/C' ? 'red' : 'green';

    const gui = getGui();
    const timeFont = getFontString(this._txtTime);
    this._txtTime.width = `${gui.measureText(this._txtTime.text, timeFont)}px`;
    // Should be the same font as time font
    this._txtCharged.width = `${gui.measureText(this._txtCharged.text, timeFont) + 20}px`;
  };

  private createLabel = (name: string, colour = 'black', outline = '#999999') => {
    const label = new TextBlock(name);
    label.fontSize = '14px';
    label.height = this._lineHeight;
    label.width = 1;
    label.color = colour;
    label.outlineColor = outline;
    label.outlineWidth = 0;
    label.fontWeight = 'bold';
    return label;
  };
}

const createGuiEntryDetail = (name: string, projectColours: { [key: number]: string }) => {
  if (!_entryDetail) {
    _entryDetail = new GuiEntryDetail(name, projectColours, getGui().addControl);
  }
  return _entryDetail;
};

const setGuiEntryDetail = (entry?: ITimesheet) => _entryDetail.setEntry(entry);

export { createGuiEntryDetail, setGuiEntryDetail };
