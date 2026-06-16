/* ==========================================================================
   Bourbon Chocolate Landing Page Logic
   React 18 + Framer Motion (Vanilla API) + Tailwind CSS (loaded in browser)
   ========================================================================== */

var h = React.createElement;
var useState  = React.useState;
var useEffect = React.useEffect;
var useRef    = React.useRef;
var Fragment  = React.Fragment;

// Motion library fallback
var hasMotion = typeof Motion !== 'undefined';
var mAnimate  = hasMotion ? Motion.animate : function() { return { cancel: function(){} }; };
var mScroll   = hasMotion ? Motion.scroll  : function() { return function(){}; };
var mInView   = hasMotion ? Motion.inView  : function() { return function(){}; };

// Product definitions
var products = [
  {
    id: 'azul',
    name: 'アルフォートミニチョコレート',
    navLabel: 'アルフォートミニチョコレート',
    subtitle: 'ミルクチョコレート',
    label: 'カカオ引き立つ',
    description: 'カカオ의味わい深いミルクチョコレートと香ばしい全粒粉入りビスケットを組合せました。全粒粉の香ばしさと絶妙なおいしさのミルクチョコレートをお楽しみください。',
    price: '¥220',
    bgColor: '#0D1A3A',
    accentColor: '#4A7EC7',
    envase: 'images/chocolate normal.webp',
    galleta: null,
  },
  {
    id: 'celeste',
    name: 'リッチミルク',
    navLabel: 'リッチミルク',
    subtitle: 'リッチミルクチョコレート',
    label: '濃厚なミルク',
    description: '濃厚なミルクチョコレートと香ばしい全粒粉入りビスケットの絶妙な組み合わせ。クリーミーで豊かなミルクの味わいが口の中に広がります。',
    price: '¥220',
    bgColor: '#0A1E2E',
    accentColor: '#5BB8D4',
    envase: 'images/chocolate leche.webp',
    galleta: null,
  },
  {
    id: 'blanco',
    name: 'バニラホワイト',
    navLabel: 'バニラホワイト',
    subtitle: 'ワイトチョコレート',
    label: 'バニラ＆ココア',
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
    name: 'ショコラサブレ',
    navLabel: 'ショコラサブレ',
    subtitle: 'ダブルチョコレート',
    label: '発酵バターたっぷりのショコラサブレ',
    description: '濃厚なカカオチョコレートとサクサクのサブレ生地を組み合わせた、贅沢な味わい。',
    price: '¥240',
    bgColor: '#1A0A06',
    accentColor: '#7C4A3C',
    envase: 'images/chocolate amargo.webp',
    galleta: null,
  },
];

// SVG shape components for parallax decorations
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

// Generate randomized parallax elements for each section
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

// Fixed Header Navigation Bar
function Navbar() {
  var state = useState(false);
  var scrolled = state[0], setScrolled = state[1];
  var state2 = useState(0);
  var activeIdx = state2[0], setActiveIdx = state2[1];

  useEffect(function() {
    function onScroll() {
      var y = window.scrollY;
      setScrolled(y > 60);

      var idx = 0;
      var minDistance = Infinity;
      var viewportCenter = window.innerHeight / 2;
      for (var i = 0; i < products.length; i++) {
        var el = document.getElementById('section-' + i);
        if (el) {
          var rect = el.getBoundingClientRect();
          var sectionCenter = rect.top + rect.height / 2;
          var distance = Math.abs(sectionCenter - viewportCenter);
          if (distance < minDistance) {
            minDistance = distance;
            idx = i;
          }
        }
      }
      setActiveIdx(idx);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return function() { window.removeEventListener('scroll', onScroll); };
  }, []);

  var activeAccent = products[activeIdx] ? products[activeIdx].accentColor : '#C9A84C';
  var cls = 'navbar' + (scrolled ? ' scrolled' : '');

  return h('header', {
    className: cls,
    style: {
      borderBottomColor: 'rgba(' + hexToRgb(activeAccent) + ', 0.25)',
      transition: 'background-color 0.5s ease, border-color 0.6s ease',
    },
  },
    h('a', { href: '#section-0', className: 'logo' },
      h('img', { src: 'images/bourbon_jp_logo.png', alt: 'Bourbon', className: 'logo-img' })
    ),
    h('nav', { className: 'nav-links' },
      products.map(function(p, i) {
        var isActive = i === activeIdx;
        return h('a', {
          key: p.id,
          href: '#section-' + i,
          className: 'nav-link' + (isActive ? ' active' : ''),
          style: isActive ? { color: products[i].accentColor } : {},
        }, p.navLabel);
      })
    )
  );
}

// Convert HEX color to RGB string format
function hexToRgb(hex) {
  var r = parseInt(hex.slice(1, 3), 16);
  var g = parseInt(hex.slice(3, 5), 16);
  var b = parseInt(hex.slice(5, 7), 16);
  return r + ', ' + g + ', ' + b;
}

// Hoverable/Interactive Product Image
function ProductImage(props) {
  var product = props.product;
  var hasGalleta = !!product.galleta;
  var envaseClass = 'product-img product-img-envase' + (product.blendScreen ? ' blend-screen' : '');
  var galletaClass = 'product-img product-img-galleta' + (product.blendScreen ? ' blend-screen' : '');

  return h('div', { className: 'product-image-container levitate section-text' + (hasGalleta ? ' has-galleta' : '') },
    h('img', {
      src: product.envase,
      alt: product.name,
      className: envaseClass,
      loading: 'lazy',
    }),
    hasGalleta
      ? h('img', {
          src: product.galleta,
          alt: product.name + ' galleta',
          className: galletaClass,
          loading: 'lazy',
        })
      : null,
    hasGalleta
      ? h('span', { className: 'hover-hint' }, 'hover to see biscuit')
      : null
  );
}

// Sidebar indicators for current scroll section
function SectionIndicators() {
  var state = useState(0);
  var activeIdx = state[0], setActiveIdx = state[1];

  useEffect(function() {
    function onScroll() {
      var idx = 0;
      var minDistance = Infinity;
      var viewportCenter = window.innerHeight / 2;
      for (var i = 0; i < products.length; i++) {
        var el = document.getElementById('section-' + i);
        if (el) {
          var rect = el.getBoundingClientRect();
          var sectionCenter = rect.top + rect.height / 2;
          var distance = Math.abs(sectionCenter - viewportCenter);
          if (distance < minDistance) {
            minDistance = distance;
            idx = i;
          }
        }
      }
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
        'aria-label': 'Go to section ' + p.name,
      });
    })
  );
}

// Split title to apply gold gradient styling to the last word
function renderTitle(subtitle) {
  var words = subtitle.split(' ');
  var lastWord = words.pop();
  var rest = words.length > 0 ? words.join(' ') + ' ' : '';

  return h('h2', { className: 'section-text section-title' },
    rest,
    h('span', { className: 'accent' }, lastWord)
  );
}

// Single-column scroll section layout
function ChocolateSection(props) {
  var product = props.product;
  var index = props.index;
  var sectionRef = useRef(null);
  var decos = getDecorations(index);

  useEffect(function() {
    var section = sectionRef.current;
    if (!section || !hasMotion) return;

    var cleanups = [];

    // Animate texts on entrance
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

    // Apply parallax effects to SVG decorations
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
      h('div', { className: 'section-content-inner' },
        h('span', { className: 'section-text section-label' }, product.label),
        renderTitle(product.subtitle),
        h(ProductImage, { product: product }),
        h('p', { className: 'section-text section-description' }, product.description),
        h('span', { className: 'section-text section-price' }, product.price)
      )
    ),

    index < products.length - 1
      ? h('div', { className: 'section-divider' })
      : null
  );
}

// App Root
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

ReactDOM.createRoot(document.getElementById('root')).render(h(App, null));
