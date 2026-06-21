import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuthContext } from './stores/AuthContext';
import { ThemeProvider } from './stores/ThemeContext';
import AuthPage from './pages/AuthPage';
import SignupForm from './components/auth/SignupForm';
import VerifyAccount from './pages/VerifyAccount';
import ChatPage from './pages/ChatPage';

const AppContent: React.FC = () => {
    const { isAuthenticated, isLoading } = useAuthContext();

    if (isLoading) {
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#0f172a',
                color: '#f1f5f9',
            }}>
                <div style={{
                    width: 40,
                    height: 40,
                    border: '3px solid rgba(255,255,255,0.3)',
                    borderTopColor: '#2563eb',
                    borderRadius: '50%',
                    animation: 'spin 0.6s linear infinite',
                }} />
            </div>
        );
    }

    return (
        <Routes>
            <Route
                path="/"
                element={isAuthenticated ? <ChatPage /> : <Navigate to="/auth" replace />}
            />
            <Route
                path="/auth"
                element={!isAuthenticated ? <AuthPage /> : <Navigate to="/" replace />}
            />
            <Route
                path="/signup"
                element={
                    <div className="auth-page" style={{ minHeight: '100vh' }}>
                        <div className="auth-bg-shader">
                            <canvas id="shader-canvas-signup" />
                        </div>
                        <script dangerouslySetInnerHTML={{
                            __html: `
                            (function() {
                                const canvas = document.getElementById('shader-canvas-signup');
                                if (!canvas) return;
                                function syncSize() {
                                    const w = canvas.clientWidth || 1280;
                                    const h = canvas.clientHeight || 720;
                                    if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
                                }
                                syncSize();
                                const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
                                if (!gl) return;
                                const vs = \`attribute vec2 a_position; varying vec2 v_texCoord; void main() { v_texCoord = a_position * 0.5 + 0.5; gl_Position = vec4(a_position, 0.0, 1.0); }\`;
                                const fs = \`precision highp float; varying vec2 v_texCoord; uniform float u_time; uniform vec2 u_resolution; void main() { vec2 uv = v_texCoord; float wave1 = sin(uv.x * 2.0 + u_time * 0.5) * 0.5 + 0.5; float wave2 = sin(uv.y * 3.0 - u_time * 0.3) * 0.5 + 0.5; vec3 color1 = vec3(0.059, 0.09, 0.165); vec3 color2 = vec3(0.118, 0.161, 0.231); vec3 finalColor = mix(color2, color1, (wave1 * wave2) * 0.3); float dist = distance(uv, vec2(0.5)); finalColor *= 1.0 - dist * 0.2; gl_FragColor = vec4(finalColor, 1.0); }\`;
                                function cs(type, src) { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return s; }
                                const prog = gl.createProgram();
                                gl.attachShader(prog, cs(gl.VERTEX_SHADER, vs));
                                gl.attachShader(prog, cs(gl.FRAGMENT_SHADER, fs));
                                gl.linkProgram(prog); gl.useProgram(prog);
                                const buf = gl.createBuffer();
                                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
                                const pos = gl.getAttribLocation(prog, 'a_position');
                                gl.enableVertexAttribArray(pos); gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);
                                const uTime = gl.getUniformLocation(prog, 'u_time');
                                const uRes = gl.getUniformLocation(prog, 'u_resolution');
                                function render(t) { syncSize(); gl.viewport(0, 0, canvas.width, canvas.height); if (uTime) gl.uniform1f(uTime, t * 0.001); if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height); gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4); requestAnimationFrame(render); }
                                render(0);
                            })();
                            `
                        }} />
                        <header className="auth-header" style={{ position: 'absolute', top: 0, left: 0, right: 0, background: 'transparent', padding: '2rem 1rem', zIndex: 20 }}>
                            <div className="auth-header-inner" />
                        </header>
                        <main className="auth-main" style={{ position: 'relative', zIndex: 10 }}>
                            <div className="auth-container" style={{ display: 'flex', justifyContent: 'center' }}>
                                <SignupForm />
                            </div>
                        </main>
                        <footer className="auth-footer" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 20 }}>
                            <div className="auth-footer-links">
                                <a href="/privacy">Chính sách bảo mật</a>
                                <span style={{ color: 'rgba(255,255,255,0.4)' }}>•</span>
                                <a href="/terms">Điều khoản dịch vụ</a>
                            </div>
                        </footer>
                    </div>
                }
            />
            <Route
                path="/account/active/:email/:verifyCode"
                element={<VerifyAccount />}
            />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

function App() {
    return (
        <BrowserRouter>
            <ThemeProvider>
                <AuthProvider>
                    <AppContent />
                </AuthProvider>
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App;