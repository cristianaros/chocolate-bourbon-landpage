/* ═══════════════════════════════════════════════════════════════
   BOURBON CHOCOLATES · Landing Page
   React 18 + Motion (Framer Motion vanilla API) + Tailwind CSS

   Runs directly in the browser — no build step required.
   ═══════════════════════════════════════════════════════════════ */

var h = React.createElement;
var useState  = React.useState;
var useEffect = React.useEffect;
var useRef    = React.useRef;
var Fragment  = React.Fragment;

// Motion library — graceful fallback
var hasMotion = typeof Motion !== 'undefined';
var mAnimate  = hasMotion ? Motion.animate : function() { return { cancel: function(){} }; };
var mScroll   = hasMotion ? Motion.scroll  : function() { return function(){}; };
var mInView   = hasMotion ? Motion.inView  : function() { return function(){}; };


/* ═══════════════════════════════════════
   productos info— Secciones 1, 2 y 4
   ═══════════════════════════════════════ */

var products = [
  {
    id: 'azul',
    name: 'アルフォートミニチョコレート',
    navLabel: 'カカオ引き立つ', //chocoalte normal
    subtitle: 'カカオ引き立つ',
    label: 'ミルクチョコレート',
    description: 'カカオの味わい深いミルクチョコレートと香ばしい全粒粉入りビスケットを組合せました。全粒粉の香ばしさと絶妙なおいしさのミルクチョコレートをお楽しみください。',
    price: '¥220',
    bgColor: '#0D1A3A',
    accentColor: '#4A7EC7',
    envase: 'images/chocolate normal.webp',
    galleta: null,
  },
  {
    id: 'celeste',
    name: 'アルフォートミニチョコレート リッチミルク',
    navLabel: '濃厚なミルク', //chocolate leche
    subtitle: '濃厚なミルク',
    label: 'リッチミルクチョコレート',
    description: '濃厚なミルクチョコレートと香ばしい全粒粉入りビスケットの絶妙な組み合わせ。クリーミーで豊かなミルクの味わいが口の中に広がります。',
    price: '¥220',
    bgColor: '#0A1E2E',
    accentColor: '#5BB8D4',
    envase: 'images/chocolate leche.webp',
    galleta: null,
  },
  {
    id: 'blanco',
    name: 'アルフォートミニチョコレート バニラホワイト',
    navLabel: 'バニラ＆ココア', // chocolate blanco
    subtitle: 'バニラ＆ココア',
    label: 'ホワイトチョコレート',
    description: 'シルクのようなホワイトチョコレートにマダガスカル産バニラを浸透。職人の手によって最高潮に達した純粋な味わい。',
    price: '¥240',
    bgColor: '#1C1A10',
    accentColor: '#D4C5A0',
    envase: 'images/chocolate vainilla.webp',
    galleta: null,
    blendScreen: true,
  },
  {
    id: 'marron',
    name: 'アルフォートミニチョコレート ショコラサブレ',
    navLabel: '発酵バターたっぷりのショコラサブレ', //chocolate negro
    subtitle: '発酵バターたっぷりのショコラサブレ',
    label: 'ダブルチョコレート',
    description: 'カカオ香るチョコ＆サブレの贅沢な融合。濃厚なダークチョコレートと香ばしいショコラサブレが織りなす、深みのある味わいをお楽しみください。',
    price: '¥240',
    bgColor: '#1A0A06',
    accentColor: '#7C4A3C',
    envase: 'images/chocolate amargo.webp',
    galleta: null,
  },
];


/* ═══════════════════════════════════════
   SVG SHAPE COMPONENTS (parallax decorations)
   ═══════════════════════════════════════ */

function SvgRing(props) {
  return h('svg', { width: props.size, height: props.size, viewBox: '0 0 100 100', fill: 'none', style: { opacity: props.opacity } },
    h('circle', { cx: 50, cy: 50, r: 38, stroke: '#C9A84C', strokeWidth: 0.8 })
  );
}

function SvgDiamond(props) {
  return h('svg', { width: props.size, height: props.size, viewBox: '0 0 100 100', fill: 'none', style: { opacity: props.opacity } },
    h('rect', { x: 29, y: 29, width: 42, height: 42, stroke: '#C9A84C', strokeWidth: 0.8, transform: 'rotate(45 50 50)' })
  );
}

function SvgDots(props) {
  return h('svg', { width: props.size, height: props.size, viewBox: '0 0 100 100', fill: '#C9A84C', style: { opacity: props.opacity } },
    h('circle', { cx: 22, cy: 32, r: 2.5 }),
    h('circle', { cx: 50, cy: 18, r: 2 }),
    h('circle', { cx: 78, cy: 38, r: 3 }),
    h('circle', { cx: 38, cy: 68, r: 1.8 }),
    h('circle', { cx: 68, cy: 78, r: 2.5 })
  );
}

function SvgArc(props) {
  return h('svg', { width: props.size, height: props.size, viewBox: '0 0 100 100', fill: 'none', style: { opacity: props.opacity } },
    h('path', { d: 'M15 75 A 40 40 0 0 1 85 75', stroke: '#C9A84C', strokeWidth: 0.8, strokeLinecap: 'round' })
  );
}

function SvgCross(props) {
  return h('svg', { width: props.size, height: props.size, viewBox: '0 0 100 100', fill: 'none', style: { opacity: props.opacity } },
    h('line', { x1: 50, y1: 22, x2: 50, y2: 78, stroke: '#C9A84C', strokeWidth: 0.8 }),
    h('line', { x1: 22, y1: 50, x2: 78, y2: 50, stroke: '#C9A84C', strokeWidth: 0.8 })
  );
}

function SvgWave(props) {
  return h('svg', { width: props.size, height: props.size, viewBox: '0 0 100 100', fill: 'none', style: { opacity: props.opacity } },
    h('path', { d: 'M8 50 C22 22, 38 78, 52 50 C66 22, 82 78, 95 50', stroke: '#C9A84C', strokeWidth: 0.8, strokeLinecap: 'round' })
  );
}

var svgComponents = {
  ring: SvgRing,
  diamond: SvgDiamond,
  dots: SvgDots,
  arc: SvgArc,
  cross: SvgCross,
  wave: SvgWave,
};


/* ═══════════════════════════════════════
   DECORATION GENERATOR
   ═══════════════════════════════════════ */

function getDecorations(index) {
  var types = ['ring', 'diamond', 'dots', 'arc', 'cross', 'wave'];
  var result = [];
  for (var i = 0; i < 5; i++) {
    var seed = index * 7 + i * 13 + 3;
    result.push({
      type: types[seed % types.length],
      left: ((seed * 37 + 17) % 78 + 6) + '%',
      top: ((seed * 43 + 11) % 65 + 12) + '%',
      size: 35 + ((seed * 23) % 65),
      speed: 0.12 + (i * 0.11),
      opacity: 0.035 + (i * 0.012),
      key: 'deco-' + index + '-' + i,
    });
  }
  return result;
}


/* ═══════════════════════════════════════
   COMPONENT: Navbar
   Siempre fijo — no se oculta al hacer scroll.
   ═══════════════════════════════════════ */

function Navbar() {
  var state = useState(false);
  var scrolled = state[0], setScrolled = state[1];
  var state2 = useState(0);
  var activeIdx = state2[0], setActiveIdx = state2[1];

  useEffect(function() {
    function onScroll() {
      var y = window.scrollY;
      setScrolled(y > 60);

      var vh = window.innerHeight;
      var idx = Math.round(y / vh);
      if (idx >= products.length) idx = products.length - 1;
      setActiveIdx(idx);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return function() { window.removeEventListener('scroll', onScroll); };
  }, []);

  // Color del producto activo
  var activeAccent = products[activeIdx] ? products[activeIdx].accentColor : '#C9A84C';
  var cls = 'navbar' + (scrolled ? ' scrolled' : '');

  return h('header', {
    className: cls,
    style: {
      borderBottomColor: 'rgba(' + hexToRgb(activeAccent) + ', 0.25)',
      transition: 'background-color 0.5s ease, border-color 0.6s ease',
    },
  },
    // Logo siempre a la izquierda
    h('a', { href: '#section-0', className: 'logo' }, 'BOURBON'),

    // Separador vertical
    h('div', { className: 'nav-separator' }),

    // Links de chocolates
    h('nav', { className: 'nav-links' },
      products.map(function(p, i) {
        var isActive = i === activeIdx;
        return h('a', {
          key: p.id,
          href: '#section-' + i,
          className: 'nav-link' + (isActive ? ' active' : ''),
          style: isActive
            ? { color: products[i].accentColor }
            : {},
        }, p.navLabel);
      })
    )
  );
}

// Convierte hex #RRGGBB a 'R, G, B' para uso en rgba()
function hexToRgb(hex) {
  var r = parseInt(hex.slice(1, 3), 16);
  var g = parseInt(hex.slice(3, 5), 16);
  var b = parseInt(hex.slice(5, 7), 16);
  return r + ', ' + g + ', ' + b;
}


/* ═══════════════════════════════════════
   COMPONENT: ProductImage
   ═══════════════════════════════════════ */

function ProductImage(props) {
  var product = props.product;
  // La vainilla blanca (caja crema) necesita screen en vez de multiply
  var imgClass = 'product-img product-img-envase' + (product.blendScreen ? ' blend-screen' : '');

  return h('div', { className: 'product-image-container levitate section-text' },
    h('img', {
      src: product.envase,
      alt: product.name,
      className: imgClass,
      loading: 'lazy',
    })
  );
}


/* ═══════════════════════════════════════
   COMPONENT: SectionIndicators
   ═══════════════════════════════════════ */

function SectionIndicators() {
  var state = useState(0);
  var activeIdx = state[0], setActiveIdx = state[1];

  useEffect(function() {
    function onScroll() {
      var vh = window.innerHeight;
      var idx = Math.round(window.scrollY / vh);
      if (idx >= products.length) idx = products.length - 1;
      setActiveIdx(idx);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return function() { window.removeEventListener('scroll', onScroll); };
  }, []);

  return h('div', { className: 'section-indicators' },
    products.map(function(p, i) {
      return h('button', {
        key: p.id,
        className: 'indicator-dot' + (i === activeIdx ? ' active' : ''),
        onClick: function() {
          document.getElementById('section-' + i).scrollIntoView({ behavior: 'smooth' });
        },
        title: p.name,
        'aria-label': 'Ir a sección ' + p.name,
      });
    })
  );
}


/* ═══════════════════════════════════════
   HELPER: Título con acento dorado en última palabra
   ═══════════════════════════════════════ */

function renderTitle(subtitle) {
  var words = subtitle.split(' ');
  var lastWord = words.pop();
  var rest = words.length > 0 ? words.join(' ') + ' ' : '';

  return h('h2', { className: 'section-text section-title' },
    rest,
    h('span', { className: 'accent' }, lastWord)
  );
}


/* ═══════════════════════════════════════
   COMPONENT: ChocolateSection
   ═══════════════════════════════════════ */

function ChocolateSection(props) {
  var product = props.product;
  var index = props.index;
  var sectionRef = useRef(null);
  var decos = getDecorations(index);

  useEffect(function() {
    var section = sectionRef.current;
    if (!section || !hasMotion) return;

    var cleanups = [];

    // Text reveal on viewport entry
    var cleanupInView = mInView(section, function(info) {
      var texts = info.target.querySelectorAll('.section-text');
      for (var i = 0; i < texts.length; i++) {
        (function(el, delay) {
          mAnimate(el,
            { opacity: [0, 1], y: [50, 0] },
            { delay: delay, duration: 0.85, easing: [0.25, 1, 0.5, 1] }
          );
        })(texts[i], i * 0.12);
      }
    }, { amount: 0.3 });
    cleanups.push(cleanupInView);

    // Parallax SVG decorations
    var svgs = section.querySelectorAll('.parallax-svg');
    for (var j = 0; j < svgs.length; j++) {
      var speed = parseFloat(svgs[j].getAttribute('data-speed') || '0.3');
      var c = mScroll(
        mAnimate(svgs[j], { y: [speed * -90, speed * 90] }),
        { target: section, offset: ['start end', 'end start'] }
      );
      cleanups.push(c);
    }

    return function() {
      for (var k = 0; k < cleanups.length; k++) {
        if (typeof cleanups[k] === 'function') cleanups[k]();
      }
    };
  }, []);

  var decoElements = decos.map(function(deco) {
    var SvgComp = svgComponents[deco.type];
    return h('div', {
      key: deco.key,
      className: 'parallax-svg',
      'data-speed': String(deco.speed),
      style: { left: deco.left, top: deco.top },
    },
      h(SvgComp, { size: deco.size, opacity: deco.opacity })
    );
  });

  return h('section', {
    ref: sectionRef,
    id: 'section-' + index,
    className: 'chocolate-section',
    'aria-label': product.name,
  },
    decoElements[0], decoElements[1], decoElements[2], decoElements[3], decoElements[4],

    h('div', { className: 'section-content' },
      h('span', { className: 'section-text section-label' }, product.label),
      renderTitle(product.subtitle),
      h(ProductImage, { product: product }),
      h('p', { className: 'section-text section-description' }, product.description),
      h('span', { className: 'section-text section-price' }, product.price)
    ),

    index < products.length - 1
      ? h('div', { className: 'section-divider' })
      : null
  );
}


/* ═══════════════════════════════════════
   COMPONENT: App
   ═══════════════════════════════════════ */

function App() {

  useEffect(function() {
    if (!hasMotion) return;

    var bgLayer = document.getElementById('bg-layer');
    if (bgLayer) {
      mScroll(
        mAnimate(bgLayer, {
          backgroundColor: products.map(function(p) { return p.bgColor; }),
        })
      );
    }
  }, []);

  return h(Fragment, null,
    h(Navbar, null),
    h(SectionIndicators, null),
    h('main', { style: { position: 'relative', zIndex: 1 } },
      products.map(function(product, i) {
        return h(ChocolateSection, { key: product.id, product: product, index: i });
      })
    )
  );
}


/* ═══════════════════════════════════════
   RENDER
   ═══════════════════════════════════════ */

ReactDOM.createRoot(document.getElementById('root')).render(h(App, null));
