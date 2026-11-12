import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import logo from '@/assets/bluluma-logo.svg';
import { useLang } from '@/lib/i18n';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from './ui/sheet';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
const industries = [{ to: '/healthcare', key: 'hc.healthcare' }, { to: '/real-estate', key: 'ind.realtors' }, { to: '/presale', key: 'ind.developers' }];
const links = [{ to: '/services', key: 'nav.services' }, { to: '/portfolio', key: 'nav.portfolio' }, { to: '/insights', key: 'nav.insights' }, { to: '/contact', key: 'nav.contact' }];
export default function Header() {
  const { lang, setLang, t } = useLang();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [location.pathname]);
  const languages = <div className="site-languages" aria-label={t('hc.language')}><Button variant="ghost" onClick={() => setLang('en')} aria-pressed={lang === 'en'}>EN</Button><span aria-hidden="true">/</span><Button variant="ghost" onClick={() => setLang('zh')} aria-pressed={lang === 'zh'}>中文</Button></div>;
  const navLink = (link: typeof links[number]) => <Link key={link.to} to={link.to} aria-current={location.pathname === link.to ? 'page' : undefined} className="site-nav-link">{t(link.key)}</Link>;
  return <header className="site-header"><div className="site-container site-header-inner"><Link to="/" className="site-brand" aria-label="Bluluma Design"><span className="site-logo"><img src={logo} alt="" /></span><span className="site-wordmark">Blu<span>luma</span></span></Link>
    <nav className="site-desktop-nav" aria-label={t('site.navigation')}>{links.slice(0,2).map(navLink)}<DropdownMenu modal={false}><DropdownMenuTrigger asChild><Button variant="ghost" className="site-nav-link">{t('nav.industries')}<ChevronDown size={14} /></Button></DropdownMenuTrigger><DropdownMenuContent className="site-industry-menu" align="start">{industries.map(link => <DropdownMenuItem key={link.to} asChild><Link to={link.to}>{t(link.key)}</Link></DropdownMenuItem>)}</DropdownMenuContent></DropdownMenu>{links.slice(2).map(navLink)}</nav>
    <div className="site-header-actions">{languages}<Button asChild variant="site" className="site-header-proposal"><Link to="/proposal">{t('hc.proposal')}</Link></Button><Sheet open={open} onOpenChange={setOpen}><SheetTrigger asChild><Button variant="ghost" size="icon" className="site-mobile-trigger" aria-label={t('site.menu.open')}><Menu /></Button></SheetTrigger><SheetContent className="site-mobile-drawer"><SheetTitle>{t('site.navigation')}</SheetTitle><nav className="site-drawer-links">{links.slice(0,2).map(navLink)}<span className="site-eyebrow">{t('nav.industries')}</span>{industries.map(navLink)}{links.slice(2).map(navLink)}<Button asChild variant="site"><Link to="/proposal">{t('hc.proposal')}</Link></Button></nav></SheetContent></Sheet></div>
  </div></header>;
}
