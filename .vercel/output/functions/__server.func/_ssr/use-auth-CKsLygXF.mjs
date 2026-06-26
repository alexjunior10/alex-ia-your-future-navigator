import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-C7mgT9XD.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-auth-CKsLygXF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var AuthContext = (0, import_react.createContext)(void 0);
function AuthProvider({ children }) {
	const [role, setRole] = (0, import_react.useState)(null);
	const [user, setUser] = (0, import_react.useState)(null);
	const [session, setSession] = (0, import_react.useState)(null);
	const [mounted, setMounted] = (0, import_react.useState)(false);
	const [showAuthModal, setShowAuthModal] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
			setUser(session?.user ?? null);
			setRole(session?.user?.user_metadata?.role || null);
			setMounted(true);
		});
		const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
			setUser(session?.user ?? null);
			setRole(session?.user?.user_metadata?.role || null);
		});
		return () => subscription.unsubscribe();
	}, []);
	const logout = async () => {
		await supabase.auth.signOut();
	};
	if (!mounted) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthContext.Provider, {
		value: {
			role,
			user,
			session,
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
