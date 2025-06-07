/** Returnable IPC types */
type IPC_types = string | number | boolean;

/*
 Global Millennium API for developers. 
*/
type Millennium = {
	/**
	 * Call a method on the backend
	 * @deprecated Use `callable` instead.
	 * Example usage:
	 * ```typescript
	 * // before
	 * const result = await Millennium.callServerMethod('methodName', { arg1: 'value' });
	 * // after
	 * const method = callable<[{ arg1: string }]>("methodName");
	 *
	 * const result1 = await method({ arg1: 'value1' });
	 * const result2 = await method({ arg1: 'value2' });
	 * ```
	 */
	callServerMethod: (methodName: string, kwargs?: object) => Promise<any>;
	findElement: (privateDocument: Document, querySelector: string, timeOut?: number) => Promise<NodeListOf<Element>>;
	exposeObj?: <T extends object>(obj: T) => any;
	AddWindowCreateHook?: (callback: (context: object) => void) => void;
};

/**
 * Make reusable IPC call declarations
 *
 * frontend:
 * ```typescript
 * const method = callable<[{ arg1: string }]>("methodName"); // declare the method
 * method({ arg1: 'value' }); // call the method
 * ```
 *
 * backend:
 * ```python
 * def methodName(arg1: str):
 *    pass
 * ```
 */
declare const callable: <Args extends any[] = [], T = IPC_types>(route: string) => (...args: Args) => Promise<T>;

const m_private_context: any = undefined;
export const pluginSelf = m_private_context;

declare global {
	interface Window {
		Millennium: Millennium;
	}
}

declare const BindPluginSettings: () => any;

interface FileInfo {
	content: string;
	filePath: string;
	fileName: string;
}

type BufferEncoding = 'ascii' | 'utf8' | 'utf-8' | 'utf16le' | 'ucs2' | 'ucs-2' | 'base64' | 'latin1' | 'binary' | 'hex';

interface SingleFileExprProps {
	basePath?: string;
	encoding?: BufferEncoding;
}

interface MultiFileExprProps {
	basePath?: string;
	include?: string; // A regex pattern to include files
	encoding?: BufferEncoding;
}

/**
 * Create a compile time filesystem expression.
 * This function will evaluate a file path at compile time, and embed a files content statically into the bundle.
 */
declare const constSysfsExpr: {
	(fileName: string, props: SingleFileExprProps): FileInfo;
	(props: MultiFileExprProps): FileInfo[];
};

const Millennium: Millennium = window.Millennium;
export { Millennium, callable, BindPluginSettings, constSysfsExpr };
