import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY;

const _supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

let authMode = 'signup';

async function checkSession() {
    const { data: { session } } = await _supabase.auth.getSession();
    if (session) {
        handleAuthSuccess(session.user);
    }
}
checkSession();

_supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
        if (session) handleAuthSuccess(session.user);
    }
});

function handleAuthSuccess(user) {
    const authNav = document.getElementById('auth-nav');
    if (authNav) {
        authNav.innerHTML = `
            <span style="color: var(--text-muted); font-size: 0.8rem; margin-right: 1rem;">${user.email}</span>
            <a href="#" class="btn btn-outline" id="logout-btn">Logout</a>
        `;
        document.getElementById('logout-btn').addEventListener('click', logout);
    }
    hideAuth();
}

async function logout() {
    await _supabase.auth.signOut();
    window.location.reload();
}

function showAuth(mode) {
    authMode = mode;
    document.getElementById('auth-modal').style.display = 'flex';
    document.getElementById('modal-title').textContent = mode === 'signup' ? 'Create Account' : 'Welcome Back';
    document.getElementById('submit-btn').textContent = mode === 'signup' ? 'Create Account' : 'Login';
    document.getElementById('toggle-link').textContent = mode === 'signup' ? 'Already have an account? Login' : "Don't have an account? Sign Up";
}

function hideAuth() {
    document.getElementById('auth-modal').style.display = 'none';
}

function toggleAuthMode() {
    showAuth(authMode === 'signup' ? 'login' : 'signup');
}

window.showAuth = showAuth;
window.hideAuth = hideAuth;
window.toggleAuthMode = toggleAuthMode;

const authForm = document.getElementById('auth-form');
if (authForm) {
    authForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const btn = document.getElementById('submit-btn');

        btn.textContent = 'Processing...';
        btn.disabled = true;

        try {
            let result;
            if (authMode === 'signup') {
                result = await _supabase.auth.signUp({ email, password });
            } else {
                result = await _supabase.auth.signInWithPassword({ email, password });
            }

            if (result.error) throw result.error;

            if (authMode === 'signup') {
                alert('Success! Please check your email for verification.');
            } else {
                alert('Logged in! You can now use the software.');
            }
            window.hideAuth();
        } catch (err) {
            alert(err.message);
        } finally {
            btn.textContent = authMode === 'signup' ? 'Create Account' : 'Login';
            btn.disabled = false;
        }
    });
}

window.handlePurchase = async function (plan) {
    alert('Stripe Integration: Redirecting to Checkout...');
}
