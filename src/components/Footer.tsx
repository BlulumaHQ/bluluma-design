import { Link } from 'react-router-dom';
import { useLang } from '@/lib/i18n';
export default function Footer() {
  const { t } = useLang();
  const columns = [
    { title: 'footer.navigation', links: [['footer.link.solutions','/solutions'],['footer.link.portfolio','/portfolio'],['footer.link.process','/process'],['footer.link.insights','/insights'],['footer.link.proposal','/proposal']] },
    { title: 'footer.services', links: [['footer.link.conversion-websites','/solutions'],['footer.link.ai-automation','/solutions'],['footer.link.brand-identity','/solutions']] },
    { title: 'nav.industries', links: [['hc.healthcare','/healthcare'],['ind.realtors','/real-estate'],['ind.developers','/presale']] },
  ];
  return <footer className="site-footer"><div className="site-container site-footer-grid"><div className="site-footer-intro"><Link to="/" aria-label="Bluluma Design home"><img src="/images/bluluma-logo.svg" alt="Bluluma Design" className="site-footer-logo" width="532" height="212" loading="lazy" /></Link><p>{t('site.footer.copyright')}</p><a href="mailto:support@bluluma.com">support@bluluma.com</a><a href="https://bluluma.com" target="_blank" rel="noopener noreferrer">bluluma.com</a></div>{columns.map(column => <div key={column.title}><h3>{t(column.title)}</h3><nav aria-label={t(column.title)}>{column.links.map(([key,to]) => <Link to={to} key={key}>{t(key)}</Link>)}</nav></div>)}</div></footer>;
}
