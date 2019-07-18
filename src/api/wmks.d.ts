
export interface ModifiableOptions {

  /**
   * Boolean:	 default	is	 true,	and	indicates	whether	 to	 rescale	 the	 remote	 screen	 to	 fit	 the
   * container's	allocated	size.
   */
  rescale?: boolean;

  /**
   * An	 enum:	 could	 be	 any	 value	 of	 WMKS.CONST.Position,	 default	 value	 is
   * WMKS.CONST.Position.CENTER.	 	 It	 indicates	 which	 position	 (center	 or	 top	 left)	 the
   * remote	screen	should	be	in	the	container.
   */
  position?: string;

  /**
   * Boolean:	default	is	true.		When	the	option	changeResolution	is	true,	WMKS	would	send
   * the	 change	 resolution	 request	 to	 the	 connected	 VM,	 with	 the	 requested	 resolution
   * (width	&	height)	being	the	same	as	the	container's	allocated	size.
   */
  changeResolution?: boolean;

  /**
   * Boolean:	default	is	false.		Enables	the	use	of	native	pixel	sizes	on	the	device.		On	iPhone
   * 4+	or	iPad	3+,	 turning	 this	on	will	enable	"Retina	mode",	which	provides	more	screen
   * space	for	the	guest,	making	everything	appear	smaller.
   */
  useNativePixels?: boolean;
  reverseScrollY?: boolean;
  fixANSIEquivalentKeys?: boolean;
  sendProperMouseWheelDeltas?: boolean;
  keyboardLayoutId?: string;
}

export type ModifiableOptionName = keyof ModifiableOptions;

export interface WMKSFactoryOptions extends ModifiableOptions {

  /**
   * It's	an	enum:	could	be	any	value	of	WMKS.CONST.AudioEncodeType.		It	indicates	which
   * type	of	audio	encode	method	is	being	used:	vorbis,	opus	or	aac.
   */
  audioEncodeType?: string;
  useUnicodeKeyboardInput?: boolean;
  useVNCHandshake?: boolean;
  retryConnectionInterval?: boolean;
  ignoredRawKeyCodes?: any[];
  VCDProxyHandshakeVmxPath?: string|null;
  enableUint8Utf8?: boolean;
}

export interface GlobalWMKSObject {
  createWMKS(htmlId: string, options: WMKSFactoryOptions): WMKSObject;
}

export interface WMKSObject {
  // Lifecycle‐related	APIs

  /**
   * Connects	the	WMKS	to	a	remote	virtual	machine	by	the	WebSocket	URL,	and	sets	up	the UI.
   * @throws Error throws error if it fails to connect
   * @param url WebSocket URL, type is string in format: <ws | wss> :// <host:port>/ <path> /? <authentication info>
   */
  connect(url: string): void;

  /**
   * Disconnects	from	the	remote	virtual	machine	and	tear	down	the	UI.
   */
  disconnect(): void;

  /**
   * Terminates	 the	 connection	 (if	 active)	 with	 the	 VM	 and	 removes	the	 widget	 from	 the
   * associated	element.		Consumers	should	call	this	before	removing	the	element	from	the
   * DOM.
   */
  destroy(): void;
  // Display‐related	APIs

  /**
   * Sends	a	request	to	set	the	screen	resolution	of	the	currently	connected	VM.		Here,	if	the
   * parameters	width	and	height	that	are	passed	are	larger	than	those	of	the	WMKS	widget
   * allocated	size,	the	sizing	would	be	normalized.
   * Note:	 this	method	could	work	properly	only	when	 the	option	changeResolution	set	 to
   * true.
   * @param width represents the desired width of the connected vm, in pixels
   * @param height represents the desired height of the connected vm, in pixels.
   */
  setRemoteScreenSize(width: number, height: number): void;
  getRemoteScreenSize(): {width: number; height: number};
  // Full‐screen‐related	APIs
  canFullScreen(): boolean;
  isFullScreen(): boolean;
  enterFullScreen(): void;
  exitFullScreen(): void;
  // Input‐related	APIs
  sendInputString(input: string): void;
  sendKeyCodes(keyCodes: number[]): void;
  sendCAD(): void;
  // Mobile‐related	APIs
  enableInputDevice(deviceTypeConstant: string): void;
  disableInputDevice(deviceTypeConstant: string): void;
  showKeyboard(): void;
  hideKeyboard(): void;
  toggleExtendedKeypad(): void;
  toggleTrackpad(): void;
  toggleRelativePad(): void;
  // Option‐related	APIs
  setOption(optionName: ModifiableOptionName, optionValue: ModifiableOptions[ModifiableOptionName]): void;
}
