import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-auth-PAiYZATh.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var AuthContext = (0, import_react.createContext)(void 0);
function AuthProvider({ children }) {
	const [role, setRole] = (0, import_react.useState)(null);
	const [mounted, setMounted] = (0, import_react.useState)(false);
	const [showAuthModal, setShowAuthModal] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const saved = localStorage.getItem("alex_ia_role");
		if (saved) setRole(saved);
		setMounted(true);
	}, []);
	const login = (r) => {
		setRole(r);
		localStorage.setItem("alex_ia_role", r ?? "");
	};
	const logout = () => {
		setRole(null);
		localStorage.removeItem("alex_ia_role");
	};
	if (!mounted) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthContext.Provider, {
		value: {
			role,
			login,
			logout,
			showAuthModal,
			setShowAuthModal
		},
		children
	});
}
function useAuth() {
	const context = (0, import_react.useContext)(AuthContext);
	if (!context) throw new Error("useAuth must be used within an AuthProvider");
	return context;
}
//#endregion
export { useAuth as n, AuthProvider as t };
