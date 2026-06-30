export const state = {
  name: '',
  team: null,   // 'pacer' | 'ghost'
  role: null,
};

export const ROLES = {
  runner:    { name:'러너',   short:'기본 역할',      headline:'팀의 든든한 기반',           detail:'번개에 참여할 때마다 마일리지가 정상 적립됩니다.' },
  elite:     { name:'엘리트', short:'마일리지 2배',    headline:'팀의 메인 화력',             detail:'번개 마일리지가 2배 적립됩니다. 투표에서 걸리면 0.5배로 전락.' },
  double:    { name:'더블',   short:'투표권 2표',      headline:'투표로 판도를 바꾼다',        detail:'투표 시 2표를 행사합니다.' },
  anchor:    { name:'앵커',   short:'상대팀 직접 삭감', headline:'달린 만큼 상대 게이지를 깎는다', detail:'내가 달린 거리만큼 상대팀 게이지에서 즉시 삭감.' },
  spy:       { name:'밀정',   short:'역할 확인 3회',   headline:'상대 핵심 인물의 역할을 캔다', detail:'3회 제한으로 역할을 확인할 수 있습니다.' },
  detective: { name:'탐정',   short:'팀 확인 3회',     headline:'의심 인물의 팀 소속을 확인',   detail:'3회 제한으로 팀 소속을 확인할 수 있습니다.' },
};

export const SPECIAL_ROLES = ['elite', 'double', 'anchor', 'spy', 'detective'];
