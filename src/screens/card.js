import { state } from '../state.js';
import { goTo } from '../nav.js';

export const id = 's-card';

export function render() {
  return `
<div class="screen" id="s-card" style="overflow:hidden;">

  <!-- 배경 오브 (팀 색상으로 교체됨) -->
  <div aria-hidden="true" id="card-orbs" style="position:absolute;inset:0;pointer-events:none;opacity:0;transition:opacity 1s;">
    <div id="card-orb-a" style="position:absolute;top:-20%;left:-15%;width:75%;aspect-ratio:1;border-radius:50%;filter:blur(52px);"></div>
    <div id="card-orb-b" style="position:absolute;bottom:-15%;right:-15%;width:65%;aspect-ratio:1;border-radius:50%;filter:blur(48px);"></div>
  </div>

  <div class="scroll" style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:36px;
    padding:calc(var(--safe-top) + 20px) 26px 0;">

    <!-- 헤더 -->
    <div class="anim-0" style="text-align:center;width:100%;padding-top:12px;">
      <p style="font-size:11px;letter-spacing:.2em;text-transform:uppercase;font-weight:700;color:#3f3f46;">TEAM ASSIGNMENT</p>
      <h2 id="card-title" style="font-size:26px;font-weight:700;letter-spacing:-.02em;line-height:1.25;margin-top:10px;color:#fafafa;">
        카드를 탭해서<br/>팀을 확인하세요
      </h2>
      <p style="font-size:13px;color:#3f3f46;margin-top:8px;">결과는 오직 나만 알 수 있어요</p>
    </div>

    <!-- 플립 카드 -->
    <div class="flip-wrap anim-1" id="card-flip-area">
      <div class="flip-inner" id="card-inner">

        <!-- 앞면 -->
        <div class="flip-face" style="
          background:rgba(255,255,255,.04);
          border:1px solid rgba(255,255,255,.09);
          box-shadow:inset 0 1px 0 rgba(255,255,255,.08);">
          <p style="font-family:'Space Grotesk';font-size:11px;letter-spacing:.3em;color:#1e1e22;text-transform:uppercase;">SHADOW RUN</p>
          <p style="font-family:'Space Grotesk';font-size:64px;font-weight:700;letter-spacing:-.04em;color:#1a1a1e;line-height:1;">?</p>
          <div style="display:flex;flex-direction:column;align-items:center;gap:6px;">
            <div style="width:28px;height:1px;background:rgba(255,255,255,.1);"></div>
            <p style="font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#3f3f46;font-weight:600;">탭하여 공개</p>
            <div style="width:28px;height:1px;background:rgba(255,255,255,.1);"></div>
          </div>
        </div>

        <!-- 뒷면 -->
        <div class="flip-face flip-back" id="card-back" style="border:1px solid transparent;">
          <p class="eyebrow" id="card-label" style="font-size:10px;letter-spacing:.22em;text-transform:uppercase;font-weight:700;"></p>
          <p id="card-team" style="font-family:'Space Grotesk';font-size:40px;font-weight:700;letter-spacing:-.03em;line-height:1;"></p>
          <div id="card-divider" style="width:36px;height:1.5px;border-radius:99px;"></div>
          <p id="card-desc" style="font-size:13px;text-align:center;padding:0 24px;line-height:1.6;opacity:.65;"></p>
          <p id="card-hint" style="font-size:11px;letter-spacing:.14em;text-transform:uppercase;font-weight:600;
            margin-top:6px;opacity:0;transition:opacity .45s var(--spring);">탭하여 계속</p>
        </div>

      </div>
    </div>

  </div>
</div>`;
}

let done = false;

export function prepare() {
  done = false;
  document.getElementById('card-inner').classList.remove('flipped', 'spinning');
  document.getElementById('card-hint').style.opacity = '0';
  document.getElementById('card-orbs').style.opacity = '0';
  const back = document.getElementById('card-back');
  back.style.background = 'rgba(255,255,255,.04)';
  back.style.border     = '1px solid rgba(255,255,255,.09)';
}

export function init() {
  document.getElementById('card-flip-area').addEventListener('click', onTap);
}

function onTap() {
  const inner = document.getElementById('card-inner');
  if (!inner.classList.contains('flipped') && !inner.classList.contains('spinning')) {
    flip();
  } else if (done) {
    goTo('s-role');
  }
}

function flip() {
  const inner   = document.getElementById('card-inner');
  const isPacer = state.team === 'pacer';

  // 오브 색상 세팅
  const orbA = document.getElementById('card-orb-a');
  const orbB = document.getElementById('card-orb-b');
  if (isPacer) {
    orbA.style.background = 'radial-gradient(circle,rgba(56,189,248,.28) 0%,transparent 70%)';
    orbB.style.background = 'radial-gradient(circle,rgba(14,165,233,.18) 0%,transparent 70%)';
  } else {
    orbA.style.background = 'radial-gradient(circle,rgba(192,132,252,.26) 0%,transparent 70%)';
    orbB.style.background = 'radial-gradient(circle,rgba(168,85,247,.18) 0%,transparent 70%)';
  }
  setTimeout(() => { document.getElementById('card-orbs').style.opacity = '1'; }, 200);

  inner.classList.add('spinning');
  inner.addEventListener('animationend', () => {
    inner.classList.add('flipped');

    const back    = document.getElementById('card-back');
    const label   = document.getElementById('card-label');
    const team    = document.getElementById('card-team');
    const divider = document.getElementById('card-divider');
    const desc    = document.getElementById('card-desc');
    const hint    = document.getElementById('card-hint');

    if (isPacer) {
      back.style.background = 'linear-gradient(160deg,rgba(56,189,248,.2) 0%,rgba(14,165,233,.06) 100%)';
      back.style.border     = '1px solid rgba(56,189,248,.35)';
      back.style.boxShadow  = 'inset 0 1px 0 rgba(255,255,255,.08)';
      label.style.color     = 'rgba(125,211,252,.7)';
      team.style.color      = '#38bdf8';
      divider.style.background = '#38bdf8';
      desc.style.color      = 'rgba(125,211,252,.65)';
      hint.style.color      = 'rgba(125,211,252,.6)';
      team.textContent      = '페이서';
      desc.textContent      = '번개를 달려 게이지를\n오른쪽으로 당겨라';
    } else {
      back.style.background = 'linear-gradient(160deg,rgba(192,132,252,.18) 0%,rgba(168,85,247,.05) 100%)';
      back.style.border     = '1px solid rgba(192,132,252,.32)';
      back.style.boxShadow  = 'inset 0 1px 0 rgba(255,255,255,.07)';
      label.style.color     = 'rgba(216,180,254,.7)';
      team.style.color      = '#c084fc';
      divider.style.background = '#c084fc';
      desc.style.color      = 'rgba(216,180,254,.65)';
      hint.style.color      = 'rgba(216,180,254,.6)';
      team.textContent      = '고스트';
      desc.textContent      = '보이지 않게 달려 게이지를\n왼쪽으로 당겨라';
    }
    label.textContent = 'YOUR TEAM';

    setTimeout(() => {
      done = true;
      hint.style.opacity = '1';
    }, 300);
  }, { once: true });
}
