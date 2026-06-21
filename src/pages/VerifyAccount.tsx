import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import './AuthPage.css';

const VerifyAccount: React.FC = () => {
    const { email, verifyCode } = useParams<{ email: string; verifyCode: string }>();
    const navigate = useNavigate();
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (!email || !verifyCode) {
            setStatus('error');
            setMessage('Liên kết xác thực không hợp lệ.');
            return;
        }

        const activate = async () => {
            try {
                const result = await authService.activeAccount({
                    email: decodeURIComponent(email),
                    verifyCode: decodeURIComponent(verifyCode),
                });
                localStorage.setItem('accessToken', result.accessToken);
                localStorage.setItem('refreshToken', result.refreshToken);
                setStatus('success');
                setMessage('Tài khoản của bạn đã được xác thực thành công!');
                setTimeout(() => navigate('/'), 2000);
            } catch (err: any) {
                setStatus('error');
                setMessage(err.message || 'Xác thực thất bại. Liên kết có thể đã hết hạn.');
            }
        };

        activate();
    }, [email, verifyCode, navigate]);

    return (
        <div className="auth-page">
            <div className="auth-bg-shader">
                <canvas id="shader-canvas" />
            </div>
            <main className="auth-main">
                <div className="auth-container" style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{
                        background: 'rgba(15, 23, 42, 0.6)',
                        backdropFilter: 'blur(12px)',
                        borderRadius: '0.75rem',
                        padding: '3rem 2rem',
                        border: '1px solid rgba(255,255,255,0.2)',
                        maxWidth: '400px',
                        width: '100%',
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.5rem',
                        alignItems: 'center',
                        animation: 'fadeInUp 0.6s ease-out forwards',
                    }}>
                        {status === 'loading' && (
                            <>
                                <div style={{
                                    width: 64, height: 64,
                                    border: '3px solid rgba(37,99,235,0.3)',
                                    borderTopColor: '#2563eb',
                                    borderRadius: '50%',
                                    animation: 'spin 0.6s linear infinite',
                                }} />
                                <h1 style={{
                                    fontFamily: 'Inter, sans-serif',
                                    fontSize: '24px', fontWeight: 600,
                                    color: '#ffffff',
                                }}>
                                    Đang xác thực tài khoản...
                                </h1>
                                <p style={{
                                    fontFamily: 'Inter, sans-serif',
                                    fontSize: '14px', color: 'rgba(255,255,255,0.7)',
                                }}>
                                    Vui lòng đợi trong giây lát
                                </p>
                            </>
                        )}

                        {status === 'success' && (
                            <>
                                <div style={{
                                    width: 64, height: 64,
                                    borderRadius: '50%',
                                    background: 'rgba(16, 185, 129, 0.2)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: 36, color: '#10b981' }}>
                                        check_circle
                                    </span>
                                </div>
                                <h1 style={{
                                    fontFamily: 'Inter, sans-serif',
                                    fontSize: '24px', fontWeight: 600,
                                    color: '#ffffff',
                                }}>
                                    Xác thực thành công!
                                </h1>
                                <p style={{
                                    fontFamily: 'Inter, sans-serif',
                                    fontSize: '14px', color: 'rgba(255,255,255,0.7)',
                                }}>
                                    {message}
                                </p>
                                <p style={{
                                    fontFamily: 'Inter, sans-serif',
                                    fontSize: '12px', color: 'rgba(255,255,255,0.5)',
                                }}>
                                    Đang chuyển hướng...
                                </p>
                            </>
                        )}

                        {status === 'error' && (
                            <>
                                <div style={{
                                    width: 64, height: 64,
                                    borderRadius: '50%',
                                    background: 'rgba(239, 68, 68, 0.2)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: 36, color: '#ef4444' }}>
                                        error
                                    </span>
                                </div>
                                <h1 style={{
                                    fontFamily: 'Inter, sans-serif',
                                    fontSize: '24px', fontWeight: 600,
                                    color: '#ffffff',
                                }}>
                                    Xác thực thất bại
                                </h1>
                                <p style={{
                                    fontFamily: 'Inter, sans-serif',
                                    fontSize: '14px', color: '#fca5a5',
                                }}>
                                    {message}
                                </p>
                                <button
                                    onClick={() => navigate('/auth')}
                                    style={{
                                        background: '#2563eb',
                                        color: '#ffffff',
                                        fontFamily: 'Inter, sans-serif',
                                        fontSize: '14px', fontWeight: 600,
                                        borderRadius: '9999px',
                                        padding: '0.75rem 2rem',
                                        border: 'none',
                                        cursor: 'pointer',
                                        boxShadow: '0 4px 12px rgba(37,99,235,0.3)',
                                        transition: 'all 0.2s',
                                    }}
                                >
                                    Quay lại đăng nhập
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </main>
            <script dangerouslySetInnerHTML={{
                __html: `
                (function() {
                    const canvas = document.getElementById('shader-canvas');
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
                    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
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
        </div>
    );
};

export default VerifyAccount;