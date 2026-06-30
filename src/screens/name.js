import { state, SPECIAL_ROLES } from '../state.js';
import { goTo } from '../nav.js';

export const id = 's-name';

export function render() {
  return `
<div class="screen active" id="s-name">

  <!-- 배경 오브 -->
  <div aria-hidden="true" style="position:absolute;inset:0;pointer-events:none;overflow:hidden;">
    <div style="position:absolute;top:-20%;left:-18%;width:72%;aspect-ratio:1;border-radius:50%;
      background:radial-gradient(circle,rgba(56,189,248,.2) 0%,transparent 70%);
      filter:blur(42px);animation:orb-a 13s ease-in-out infinite alternate;"></div>
    <div style="position:absolute;top:8%;right:-20%;width:64%;aspect-ratio:1;border-radius:50%;
      background:radial-gradient(circle,rgba(192,132,252,.18) 0%,transparent 70%);
      filter:blur(38px);animation:orb-b 15s ease-in-out infinite alternate;"></div>
    <div style="position:absolute;bottom:-12%;left:50%;transform:translateX(-50%);width:80%;aspect-ratio:1;
      border-radius:50%;background:radial-gradient(circle,rgba(14,165,233,.07) 0%,transparent 65%);
      filter:blur(52px);"></div>
  </div>

  <!-- 콘텐츠 -->
  <div class="scroll" style="display:flex;flex-direction:column;
    padding: calc(var(--safe-top) + 20px) 26px max(var(--safe-bottom), 28px);">

    <!-- 상단 브랜딩 -->
    <div style="flex:1;display:flex;flex-direction:column;justify-content:center;min-height:0;padding-bottom:20px;">

      <p class="anim-0" style="font-size:11px;letter-spacing:.22em;font-weight:700;text-transform:uppercase;
        background:linear-gradient(90deg,rgba(56,189,248,.55),rgba(192,132,252,.55));
        -webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:20px;">
        HNRC 2026 하반기 이벤트 런
      </p>

      <h1 class="anim-1" style="font-family:'Space Grotesk',sans-serif;
        font-size:clamp(52px,16vw,68px);font-weight:700;letter-spacing:-.04em;line-height:.92;margin-bottom:0;">
        <span style="display:block;
          background:linear-gradient(135deg,#7dd3fc 0%,#38bdf8 35%,#818cf8 65%,#c084fc 100%);
          -webkit-background-clip:text;-webkit-text-fill-color:transparent;">SHADOW</span>
        <span style="display:block;color:#fafafa;margin-top:4px;">RUN</span>
      </h1>

      <div class="anim-2" style="display:flex;align-items:center;gap:12px;margin-top:24px;">
        <div style="flex:1;height:1px;background:linear-gradient(90deg,rgba(56,189,248,.4),rgba(192,132,252,.3));"></div>
        <span style="font-size:11px;letter-spacing:.14em;font-weight:600;color:#52525b;text-transform:uppercase;">vs</span>
        <div style="flex:1;height:1px;background:linear-gradient(90deg,rgba(192,132,252,.3),rgba(56,189,248,.4));"></div>
      </div>

      <div class="anim-2" style="display:flex;justify-content:space-between;align-items:baseline;margin-top:14px;">
        <span style="font-family:'Space Grotesk';font-size:22px;font-weight:700;letter-spacing:-.02em;color:#c084fc;">GHOST</span>
        <span style="font-family:'Space Grotesk';font-size:22px;font-weight:700;letter-spacing:-.02em;color:#38bdf8;">PACER</span>
      </div>

      <p class="anim-3" style="font-size:14px;color:#52525b;margin-top:18px;line-height:1.75;">
        정체를 숨기고 아군을 찾아라!<br/>3주간의 치열한 실시간 줄다리기 레이스
      </p>
    </div>

    <!-- 이름 입력 -->
    <div class="anim-4" style="margin-top:auto;">
      <label style="font-size:12px;color:#52525b;display:block;margin-bottom:8px;
        letter-spacing:.06em;text-transform:uppercase;font-weight:600;">이름</label>
      <div style="display:flex;align-items:center;gap:10px;">
        <input class="input" type="text" id="name-input"
          placeholder="홍길동"
          autocomplete="off" autocorrect="off" spellcheck="false"
          style="flex:1;font-size:17px;font-weight:500;" />
        <button id="enter-btn" disabled
          style="width:50px;height:50px;flex-shrink:0;border-radius:14px;border:none;cursor:pointer;
            background:rgba(255,255,255,.06);color:rgba(255,255,255,.22);
            font-size:20px;font-weight:700;
            transition:background .25s var(--spring),color .25s var(--spring),box-shadow .25s var(--spring);">
          →
        </button>
      </div>
      <p style="font-size:13px;color:#3f3f46;margin-top:10px;font-weight:600;">실명으로 입장하세요</p>
    </div>

  </div>
</div>`;
}

export function init() {
  const input = document.getElementById('name-input');
  const btn   = document.getElementById('enter-btn');

  input.addEventListener('input', () => {
    const has = input.value.trim().length > 0;
    btn.disabled = !has;
    btn.style.background  = has ? 'linear-gradient(135deg,#0ea5e9,#7c3aed)' : 'rgba(255,255,255,.06)';
    btn.style.color       = has ? '#fff' : 'rgba(255,255,255,.22)';
    btn.style.boxShadow   = has ? '0 6px 20px -6px rgba(100,100,240,.5)' : 'none';
  });

  btn.addEventListener('click', enter);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); enter(); } });
}

function enter() {
  const input = document.getElementById('name-input');
  const name  = input.value.trim();
  if (!name) { input.focus(); input.style.borderColor = 'rgba(251,113,133,.6)'; return; }
  input.style.borderColor = '';
  state.name = name;
  state.team = Math.random() < .5 ? 'pacer' : 'ghost';
  state.role = SPECIAL_ROLES[Math.floor(Math.random() * SPECIAL_ROLES.length)];
  goTo('s-card');
}
