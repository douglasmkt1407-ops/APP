import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Mail,
  Lock,
  User,
  Target,
  ArrowRight,
  Eye,
  EyeOff,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  Users,
  Sparkles,
  RefreshCw,
  Database
} from 'lucide-react';
import { getSavedCredentials, UserAccountMemory } from '../utils/userMemory';

export const AuthModal: React.FC = () => {
  const { login, registerAccount, getAllStoredAccounts, changePassword } = useApp();
  const [isRegistering, setIsRegistering] = useState(false);

  // Login form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Register form state
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [targetExam, setTargetExam] = useState('Concurso Técnico em Enfermagem / EBSERH');

  // UI state
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [showAccountsList, setShowAccountsList] = useState(false);

  // Reset password state
  const [resetEmail, setResetEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [resetMessage, setResetMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  const storedAccounts = getAllStoredAccounts();

  useEffect(() => {
    // Pre-fill remembered credentials if exists
    const saved = getSavedCredentials();
    if (saved && saved.email) {
      setEmail(saved.email);
      if (saved.password) {
        setPassword(saved.password);
      }
      setRememberMe(saved.rememberMe !== false);
    } else if (storedAccounts.length > 0) {
      setEmail(storedAccounts[0].email);
    }
  }, []);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!email || !email.includes('@')) {
      setErrorMessage('Por favor, informe um endereço de e-mail válido.');
      return;
    }

    if (!password) {
      setErrorMessage('Por favor, digite sua senha de acesso.');
      return;
    }

    const res = login(email, password, rememberMe);
    if (!res.success) {
      setErrorMessage(res.message || 'Falha ao autenticar.');
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!name.trim()) {
      setErrorMessage('Por favor, informe seu nome completo.');
      return;
    }

    if (!email || !email.includes('@')) {
      setErrorMessage('Por favor, informe um endereço de e-mail válido.');
      return;
    }

    if (!password || password.length < 3) {
      setErrorMessage('A senha deve ter no mínimo 3 dígitos.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('As senhas digitadas não conferem. Por favor, verifique.');
      return;
    }

    const res = registerAccount(email, password, name, targetExam, rememberMe);
    if (!res.success) {
      setErrorMessage(res.message || 'Erro ao criar conta.');
    }
  };

  const handleResetPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResetMessage(null);

    if (!resetEmail || !resetEmail.includes('@')) {
      setResetMessage({ type: 'error', text: 'Informe um e-mail válido cadastrado.' });
      return;
    }

    if (!newPassword || newPassword.length < 3) {
      setResetMessage({ type: 'error', text: 'A nova senha deve ter no mínimo 3 dígitos.' });
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setResetMessage({ type: 'error', text: 'A confirmação de senha não confere.' });
      return;
    }

    const res = changePassword(resetEmail, newPassword);
    if (res.success) {
      setResetMessage({ type: 'success', text: 'Senha atualizada com sucesso! Você já pode entrar.' });
      setEmail(resetEmail);
      setPassword(newPassword);
      setTimeout(() => {
        setShowForgotModal(false);
        setResetMessage(null);
      }, 1500);
    } else {
      setResetMessage({ type: 'error', text: res.message });
    }
  };

  const selectAccount = (acc: UserAccountMemory) => {
    setEmail(acc.email);
    setPassword(acc.password || '');
    setShowAccountsList(false);
    setErrorMessage('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#040810]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Background medical glow elements */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-[#00E5A3]/5 blur-[120px] pointer-events-none -top-20 -left-20" />
      <div className="absolute w-[450px] h-[450px] rounded-full bg-[#0084FF]/5 blur-[120px] pointer-events-none -bottom-20 -right-20" />

      <div className="relative w-full max-w-md bg-[#0A1424] border border-[#162942] rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/90 animate-fadeIn">
        {/* Brand header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00E5A3] to-[#0084FF] p-[2px] shadow-[0_0_25px_rgba(0,229,163,0.35)] mb-3">
            <div className="w-full h-full bg-[#060D17] rounded-[14px] flex items-center justify-center">
              <span className="bg-gradient-to-r from-[#00E5A3] to-[#38BDF8] bg-clip-text text-transparent font-black text-2xl">
                N<sup className="text-sm font-black -top-2 text-[#00E5A3]">+</sup>
              </span>
            </div>
          </div>

          <h2 className="text-2xl font-black tracking-tight text-white flex items-center gap-1.5">
            NEXTENF
          </h2>
          <p className="text-xs font-bold tracking-[0.25em] text-[#00E5A3] uppercase">
            Técnico em Foco
          </p>

          <p className="mt-2 text-xs sm:text-sm text-slate-400">
            {isRegistering
              ? 'Cadastre seu e-mail e senha para salvar todo seu progresso de estudos.'
              : 'Entre com seu e-mail e senha para acessar seus estudos salvos na memória.'}
          </p>
        </div>

        {/* Database memory badge */}
        <div className="mb-4 px-3 py-2 rounded-xl bg-[#060D17] border border-[#162942] flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-1.5 text-[#00E5A3]">
            <Database className="w-3.5 h-3.5" />
            <span className="font-semibold">Banco de Dados Ativo</span>
          </div>
          <span className="text-slate-500">Progresso e senhas 100% salvos</span>
        </div>

        {/* Auth Tab Switcher */}
        <div className="flex rounded-xl bg-[#060D17] p-1 border border-[#142A46] mb-5">
          <button
            type="button"
            onClick={() => {
              setIsRegistering(false);
              setErrorMessage('');
            }}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              !isRegistering
                ? 'bg-[#00E5A3] text-slate-900 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Entrar
          </button>
          <button
            type="button"
            onClick={() => {
              setIsRegistering(true);
              setErrorMessage('');
            }}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              isRegistering
                ? 'bg-[#00E5A3] text-slate-900 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Criar Conta
          </button>
        </div>

        {/* Stored accounts quick switcher if exists */}
        {!isRegistering && storedAccounts.length > 0 && (
          <div className="mb-4">
            <button
              type="button"
              onClick={() => setShowAccountsList(!showAccountsList)}
              className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#060D17] border border-[#162942] text-xs text-slate-300 hover:border-[#00E5A3]/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#00E5A3]" />
                <span>Contas salvas no dispositivo ({storedAccounts.length})</span>
              </div>
              <span className="text-[10px] text-[#00E5A3] font-bold">
                {showAccountsList ? 'Ocultar' : 'Ver Contas'}
              </span>
            </button>

            {showAccountsList && (
              <div className="mt-2 space-y-1.5 p-2 rounded-xl bg-[#060D17] border border-[#162942] max-h-36 overflow-y-auto">
                {storedAccounts.map(acc => (
                  <button
                    key={acc.email}
                    type="button"
                    onClick={() => selectAccount(acc)}
                    className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-[#0E1E34] text-left transition-colors cursor-pointer"
                  >
                    <div>
                      <div className="text-xs font-bold text-white truncate">{acc.name}</div>
                      <div className="text-[10px] text-slate-400 truncate">{acc.email}</div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#00E5A3]/10 text-[#00E5A3] font-bold">
                      Selecionar
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Error notification */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-medium flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Success notification */}
        {successMessage && (
          <div className="mb-4 p-3 rounded-xl bg-[#00E5A3]/10 border border-[#00E5A3]/30 text-[#00E5A3] text-xs font-medium flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-[#00E5A3]" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* LOGIN FORM */}
        {!isRegistering ? (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                E-mail Cadastrado
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  placeholder="aluno@nextenf.com.br"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-[#060D17] border border-[#162942] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00E5A3] transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Senha
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setResetEmail(email);
                    setShowForgotModal(true);
                  }}
                  className="text-[11px] text-[#00E5A3] hover:underline cursor-pointer"
                >
                  Esqueceu a senha?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full bg-[#060D17] border border-[#162942] rounded-xl pl-10 pr-10 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00E5A3] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                  className="rounded border-[#162942] bg-[#060D17] text-[#00E5A3] focus:ring-0 focus:ring-offset-0"
                />
                <span>Lembrar meu login neste dispositivo</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-[#00E5A3] to-[#00C2FF] text-[#060D17] font-bold text-sm flex items-center justify-center gap-2 hover:opacity-95 shadow-[0_0_25px_rgba(0,229,163,0.35)] transition-all cursor-pointer"
            >
              <span>Entrar e Carregar Meus Estudos</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          /* REGISTRATION FORM */
          <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Nome Completo
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="Ex: Mariana Albuquerque"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full bg-[#060D17] border border-[#162942] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00E5A3] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                E-mail para Acesso
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  placeholder="seu.email@exemplo.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-[#060D17] border border-[#162942] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00E5A3] transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Criar Senha
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Mínimo 3 dígitos"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full bg-[#060D17] border border-[#162942] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00E5A3] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Confirmar Senha
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Repita a senha"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    className="w-full bg-[#060D17] border border-[#162942] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00E5A3] transition-colors"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Concurso ou Objetivo Alvo
              </label>
              <div className="relative">
                <Target className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Ex: Concurso Técnico EBSERH / SUS"
                  value={targetExam}
                  onChange={e => setTargetExam(e.target.value)}
                  className="w-full bg-[#060D17] border border-[#162942] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00E5A3] transition-colors"
                />
              </div>
            </div>

            {/* Zero state note */}
            <div className="p-3 rounded-xl bg-[#0F2238]/70 border border-[#00E5A3]/25 flex items-start gap-2.5 text-xs text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-[#00E5A3] shrink-0 mt-0.5" />
              <span>
                <strong className="text-[#00E5A3]">Memória Dedicada:</strong> Sua conta começará limpa com contadores zerados para registrar seu histórico real.
              </span>
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-[#00E5A3] to-[#00C2FF] text-[#060D17] font-bold text-sm flex items-center justify-center gap-2 hover:opacity-95 shadow-[0_0_25px_rgba(0,229,163,0.35)] transition-all cursor-pointer"
            >
              <span>Criar Conta & Iniciar Estudos</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Footer info for buyer / commercial credential */}
        <div className="mt-5 pt-4 border-t border-[#162942] flex flex-col items-center text-center gap-2 text-xs text-slate-400">
          <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#00E5A3]" />
            <span>Memória contínua com banco de dados local no seu navegador</span>
          </div>

          <p className="text-slate-400">
            {isRegistering ? 'Já possui conta de acesso?' : 'Ainda não tem conta de acesso?'}{' '}
            <button
              type="button"
              onClick={() => {
                setIsRegistering(!isRegistering);
                setErrorMessage('');
              }}
              className="text-[#00E5A3] font-bold hover:underline cursor-pointer"
            >
              {isRegistering ? 'Fazer Login' : 'Cadastre-se aqui'}
            </button>
          </p>
        </div>
      </div>

      {/* Forgot/Reset Password Modal Dialog */}
      {showForgotModal && (
        <div className="fixed inset-0 z-60 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#091526] border border-[#142A46] rounded-2xl p-6 max-w-sm w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-2.5">
                <KeyRound className="w-5 h-5 text-[#00E5A3]" />
                <h3 className="font-bold text-base">Redefinir Senha</h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowForgotModal(false);
                  setResetMessage(null);
                }}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Informe o e-mail da sua conta e defina sua nova senha de acesso:
            </p>

            {resetMessage && (
              <div
                className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                  resetMessage.type === 'success'
                    ? 'bg-[#00E5A3]/10 border border-[#00E5A3]/30 text-[#00E5A3]'
                    : 'bg-rose-500/10 border border-rose-500/30 text-rose-300'
                }`}
              >
                {resetMessage.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 shrink-0" />
                )}
                <span>{resetMessage.text}</span>
              </div>
            )}

            <form onSubmit={handleResetPasswordSubmit} className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  E-mail da Conta
                </label>
                <input
                  type="email"
                  required
                  placeholder="seu.email@exemplo.com"
                  value={resetEmail}
                  onChange={e => setResetEmail(e.target.value)}
                  className="w-full bg-[#060D17] border border-[#162942] rounded-xl px-3.5 py-2 text-xs text-white focus:border-[#00E5A3] outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Nova Senha
                </label>
                <input
                  type="password"
                  required
                  placeholder="Mínimo 3 dígitos"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  className="w-full bg-[#060D17] border border-[#162942] rounded-xl px-3.5 py-2 text-xs text-white focus:border-[#00E5A3] outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Confirmar Nova Senha
                </label>
                <input
                  type="password"
                  required
                  placeholder="Repita a nova senha"
                  value={confirmNewPassword}
                  onChange={e => setConfirmNewPassword(e.target.value)}
                  className="w-full bg-[#060D17] border border-[#162942] rounded-xl px-3.5 py-2 text-xs text-white focus:border-[#00E5A3] outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-2.5 rounded-xl bg-[#00E5A3] text-slate-900 font-bold text-xs hover:bg-[#00c98f] transition-colors cursor-pointer"
              >
                Atualizar Senha
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
