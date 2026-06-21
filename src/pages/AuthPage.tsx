import React from 'react';
import LoginForm from '../components/auth/LoginForm';
import './AuthPage.css';

const AuthPage: React.FC = () => {
    return (
        <div className="auth-page">
            {/* Shader Background - WebGL Canvas */}
            <div className="auth-bg-shader">
                <canvas id="shader-canvas" />
            </div>

            {/* Header */}
            <header className="auth-header">
                <div className="auth-header-inner">
                    {/* Logo placeholder */}
                </div>
            </header>

            {/* Main Content */}
            <main className="auth-main">
                <div className="auth-container">
                    <LoginForm />
                </div>
            </main>

            {/* Footer */}
            <footer className="auth-footer">
                <div className="auth-footer-links">
                    <a href="/privacy">Privacy Policy</a>
                    <a href="/terms">Terms of Service</a>
                    <a href="/help">Help Center</a>
                </div>
            </footer>

            {/* Background shader script */}
            <script dangerouslySetInnerHTML={{
                __html: `
                (function() {
                    const canvas = document.getElementById('shader-canvas');
                    if (!canvas) return;
                    function syncSize() {
                        const w = canvas.clientWidth || 1280;
                        const h = canvas.clientHeight || 720;
                        if (canvas.width !== w || canvas.height !== h) {
                            canvas.width = w;
                            canvas.height = h;
                        }
                    }
                    syncSize();
                    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
                    if (!gl) return;
                    const vs = \`attribute vec2 a_position;
        varying vec2 v_texCoord;
        void main() {
          v_texCoord = a_position * 0.5 + 0.5;
          gl_Position = vec4(a_position, 0.0, 1.0);
        }\`;
                    const fs = \`precision highp float;
        varying vec2 v_texCoord;
        uniform float u_time;
        uniform vec2 u_resolution;
        void main() {
            vec2 uv = v_texCoord;
            float wave1 = sin(uv.x * 2.0 + u_time * 0.5) * 0.5 + 0.5;
            float wave2 = sin(uv.y * 3.0 - u_time * 0.3) * 0.5 + 0.5;
            vec3 color1 = vec3(0.059, 0.09, 0.165);
            vec3 color2 = vec3(0.118, 0.161, 0.231);
            vec3 finalColor = mix(color2, color1, (wave1 * wave2) * 0.3);
            float dist = distance(uv, vec2(0.5));
            finalColor *= 1.0 - dist * 0.2;
            gl_FragColor = vec4(finalColor, 1.0);
        }\`;
                    function cs(type, src) {
                        const s = gl.createShader(type);
                        gl.shaderSource(s, src);
                        gl.compileShader(s);
                        return s;
                    }
                    const prog = gl.createProgram();
                    gl.attachShader(prog, cs(gl.VERTEX_SHADER, vs));
                    gl.attachShader(prog, cs(gl.FRAGMENT_SHADER, fs));
                    gl.linkProgram(prog);
                    gl.useProgram(prog);
                    const buf = gl.createBuffer();
                    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
                    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
                    const pos = gl.getAttribLocation(prog, 'a_position');
                    gl.enableVertexAttribArray(pos);
                    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);
                    const uTime = gl.getUniformLocation(prog, 'u_time');
                    const uRes = gl.getUniformLocation(prog, 'u_resolution');
                    function render(t) {
                        syncSize();
                        gl.viewport(0, 0, canvas.width, canvas.height);
                        if (uTime) gl.uniform1f(uTime, t * 0.001);
                        if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
                        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
                        requestAnimationFrame(render);
                    }
                    render(0);
                })();
                `
            }} />
        </div>
    );
};

export default AuthPage;