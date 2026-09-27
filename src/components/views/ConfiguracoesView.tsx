import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { AVATAR_PRESETS } from '../../data/avatarPresets';
import {
  Bell,
  Clock,
  Volume2,
  Shield,
  User,
  Target,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Send,
  Save,
  Plus,
  Trash2,
  BellRing,
  Play,
  Camera,
  Upload,
  Image as ImageIcon,
  Link as LinkIcon,
  Check,
  X,
  Smartphone,
  KeyRound,
  Database,
  Lock,
  Download,
  Compass
} from 'lucide-react';

export const ConfiguracoesView: React.FC = () => {
  const {
    user,
    updateProfile,
    changePassword,
    setIsInstallModalOpen,
    promptPwaInstall,
    canInstallPwa,
    startTour,
    notifications,
    updateNotificationSettings,
    requestBrowserNotificationPermission,
    sendTestNotification,
    resetAllStatsToZero,
    loadDemoStats,
    scheduledReminders,
    toggleScheduledReminder,
    updateScheduledReminderTime,
    addScheduledReminder,
    deleteScheduledReminder,
    triggerScheduledReminderNotification
  } = useApp();

  const [name, setName] = useState(user?.name || '');
  const [targetExam, setTargetExam] = useState(user?.targetExam || '');
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || '');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetSuccessBanner, setResetSuccessBanner] = useState(false);
  const [demoSuccessBanner, setDemoSuccessBanner] = useState(false);

  // Change password states
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [newPasswordVal, setNewPasswordVal] = useState('');
  const [confirmPasswordVal, setConfirmPasswordVal] = useState('');
  const [passwordChangeFeedback, setPasswordChangeFeedback] = useState<{ text: string; isError?: boolean } | null>(null);
  
  // Profile photo state
  const [photoFeedback, setPhotoFeedback] = useState<{ text: string; isError?: boolean } | null>(null);
  const [showPresetPicker, setShowPresetPicker] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlInputValue, setUrlInputValue] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync state when user updates
  useEffect(() => {
    if (user) {
      setName(user.name);
      setTargetExam(user.targetExam);
      setAvatarUrl(user.avatarUrl || '');
    }
  }, [user]);
  
  // Custom reminder modal state
  const [showAddReminderModal, setShowAddReminderModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [newTime, setNewTime] = useState('19:00');
  const [newCategory, setNewCategory] = useState('Geral');

  const [permissionStatus, setPermissionStatus] = useState<string>(
    typeof window !== 'undefined' && 'Notification' in window
      ? Notification.permission
      : 'unsupported'
  );

  const handleRequestPermission = async () => {
    const granted = await requestBrowserNotificationPermission();
    if ('Notification' in window) {
      setPermissionStatus(Notification.permission);
    }
    if (granted) {
      sendTestNotification();
    }
  };

  const handleAddNewReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newTime) return;
    addScheduledReminder({
      title: newTitle.trim(),
      message: newMessage.trim() || 'Hora de cumprir sua meta diária de estudos no NEXTENF!',
      time: newTime,
      enabled: true,
      category: newCategory
    });
    setNewTitle('');
    setNewMessage('');
    setShowAddReminderModal(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setPhotoFeedback({ text: 'Por favor, selecione um arquivo de imagem válido (JPG, PNG, WebP).', isError: true });
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setPhotoFeedback({ text: 'A imagem selecionada é muito pesada. Escolha uma foto de até 8MB.', isError: true });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Downscale to max 280x280 using canvas to optimize storage in localStorage
        const maxDim = 280;
        let w = img.width;
        let h = img.height;
        if (w > maxDim || h > maxDim) {
          if (w > h) {
            h = Math.round((h * maxDim) / w);
            w = maxDim;
          } else {
            w = Math.round((w * maxDim) / h);
            h = maxDim;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, w, h);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.88);
          setAvatarUrl(compressedDataUrl);
          updateProfile(name, targetExam, compressedDataUrl);
          setPhotoFeedback({ text: 'Foto de perfil carregada e atualizada com sucesso!' });
          setTimeout(() => setPhotoFeedback(null), 3500);
        }
      };
      img.onerror = () => {
        setPhotoFeedback({ text: 'Não foi possível carregar a imagem. Tente outro arquivo.', isError: true });
      };
      img.src = event.target?.result as string;
    };
    reader.onerror = () => {
      setPhotoFeedback({ text: 'Erro ao ler o arquivo selecionado.', isError: true });
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleSelectPreset = (presetUrl: string) => {
    setAvatarUrl(presetUrl);
    updateProfile(name, targetExam, presetUrl);
    setPhotoFeedback({ text: 'Avatar da saúde selecionado e salvo com sucesso!' });
    setTimeout(() => setPhotoFeedback(null), 3500);
  };

  const handleRemovePhoto = () => {
    setAvatarUrl('');
    updateProfile(name, targetExam, '');
    setPhotoFeedback({ text: 'Foto de perfil removida. Exibindo iniciais do nome.' });
    setTimeout(() => setPhotoFeedback(null), 3500);
  };

  const handleApplyUrl = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!urlInputValue.trim()) return;
    setAvatarUrl(urlInputValue.trim());
    updateProfile(name, targetExam, urlInputValue.trim());
    setShowUrlInput(false);
    setUrlInputValue('');
    setPhotoFeedback({ text: 'URL da imagem aplicada com sucesso!' });
    setTimeout(() => setPhotoFeedback(null), 3500);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(name, targetExam, avatarUrl);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const executeResetAllStats = () => {
    resetAllStatsToZero();
    setShowResetModal(false);
    setResetSuccessBanner(true);
    setTimeout(() => setResetSuccessBanner(false), 3500);
  };

  const executeLoadDemo = () => {
    loadDemoStats();
    setDemoSuccessBanner(true);
    setTimeout(() => setDemoSuccessBanner(false), 3500);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12 animate-fadeIn">
      {/* Header */}
      <div className="bg-[#091526] border border-[#142A46] rounded-3xl p-6 sm:p-7">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#00E5A3] bg-[#00E5A3]/10 px-2.5 py-0.5 rounded-full border border-[#00E5A3]/20 flex items-center gap-1">
            <Bell className="w-3 h-3" />
            Central de Notificações & Ajustes
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Configurações da Plataforma
        </h1>
        <p className="text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
          Configure seus lembretes e notificações de estudos, horários de alerta diários, perfil de concursando e gerencie seus dados.
        </p>
      </div>

      {/* SECTION 1: NOTIFICATION SCHEDULING SYSTEM */}
      <div className="bg-[#091526] border border-[#142A46] rounded-3xl p-6 sm:p-7 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#142A46] gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#00E5A3]/10 flex items-center justify-center text-[#00E5A3]">
              <BellRing className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Agendador de Lembretes de Estudo</h2>
              <p className="text-xs text-slate-400">
                Configure seus horários diários preferidos para receber alertas da Notification API do navegador
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              type="button"
              onClick={sendTestNotification}
              className="px-3.5 py-2 rounded-xl bg-[#0F2642] hover:bg-[#16355C] border border-[#00E5A3]/30 text-xs font-bold text-[#00E5A3] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Testar Notificação</span>
            </button>
          </div>
        </div>

        {/* Scheduled Reminders List with Time Selectors & Toggles */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Seus Lembretes Programados:
              </h3>
              <p className="text-[11px] text-slate-500">
                Ative ou desative cada alerta e ajuste o horário desejado
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowAddReminderModal(true)}
              className="px-3 py-1.5 rounded-xl bg-[#060D17] hover:bg-[#102238] border border-[#162D4A] hover:border-[#00E5A3]/50 text-xs font-bold text-[#00E5A3] flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
              <span>Novo Lembrete</span>
            </button>
          </div>

          <div className="space-y-3">
            {scheduledReminders.map(reminder => (
              <div
                key={reminder.id}
                className={`p-4 rounded-2xl border transition-all ${
                  reminder.enabled
                    ? 'bg-[#060D17] border-[#183659]'
                    : 'bg-[#050B14]/60 border-[#102033] opacity-60'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                        reminder.enabled
                          ? 'bg-[#00E5A3]/10 text-[#00E5A3]'
                          : 'bg-slate-800 text-slate-500'
                      }`}
                    >
                      <Clock className="w-4 h-4" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-white">{reminder.title}</h4>
                        {reminder.category && (
                          <span className="text-[10px] font-semibold text-[#00E5A3] bg-[#00E5A3]/10 px-2 py-0.5 rounded-full border border-[#00E5A3]/20">
                            {reminder.category}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">{reminder.message}</p>
                    </div>
                  </div>

                  {/* Actions: Time Picker + Test Button + Toggle Switch */}
                  <div className="flex items-center gap-2.5 self-end sm:self-center">
                    {/* Time Input */}
                    <div className="flex items-center gap-1.5 bg-[#091526] border border-[#142A46] rounded-xl px-2.5 py-1 text-xs">
                      <span className="text-[10px] text-slate-400 font-semibold">Horário:</span>
                      <input
                        type="time"
                        value={reminder.time}
                        onChange={e => updateScheduledReminderTime(reminder.id, e.target.value)}
                        className="bg-transparent font-mono font-bold text-white focus:outline-none focus:text-[#00E5A3] text-xs cursor-pointer"
                      />
                    </div>

                    {/* Test alert trigger */}
                    <button
                      type="button"
                      onClick={() => triggerScheduledReminderNotification(reminder)}
                      title="Testar este lembrete imediatamente"
                      className="p-2 rounded-xl bg-[#091526] hover:bg-[#142A46] text-slate-400 hover:text-[#00E5A3] border border-[#142A46] transition-colors cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                    </button>

                    {/* Toggle */}
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={reminder.enabled}
                        onChange={() => {
                          if (permissionStatus !== 'granted') {
                            handleRequestPermission();
                          }
                          toggleScheduledReminder(reminder.id);
                        }}
                        className="sr-only peer"
                      />
                      <div className="w-10 h-6 bg-[#091526] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00E5A3]"></div>
                    </label>

                    {/* Delete custom reminder */}
                    {reminder.id.startsWith('rem_') && (
                      <button
                        type="button"
                        onClick={() => deleteScheduledReminder(reminder.id)}
                        title="Excluir lembrete"
                        className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Audio Alerts & Summary status */}
        <div className="pt-2 border-t border-[#142A46] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-[#00E5A3]" />
            <span>Tocar aviso sonoro (chime) nas notificações de estudo</span>
          </div>

          <label className="relative inline-flex items-center cursor-pointer self-start sm:self-auto">
            <input
              type="checkbox"
              checked={notifications.soundAlerts}
              onChange={e => updateNotificationSettings({ soundAlerts: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-[#060D17] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#00E5A3]"></div>
          </label>
        </div>

        {/* Active Scheduler Feedback */}
        <div className="p-3.5 rounded-2xl bg-[#060D17] border border-[#142A46] flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00E5A3] animate-pulse" />
            <span>
              Agendador em execução:{' '}
              <strong className="text-white">
                {scheduledReminders.filter(r => r.enabled).length} de {scheduledReminders.length}{' '}
                lembretes ativos
              </strong>
            </span>
          </div>
          <span className="text-[11px] text-slate-500 font-mono hidden sm:inline">
            Checagem contínua via Notification API
          </span>
        </div>
      </div>

      {/* SECTION 2: PROFILE & CONCURSO */}
      <form
        onSubmit={handleSaveProfile}
        className="bg-[#091526] border border-[#142A46] rounded-3xl p-6 sm:p-7 space-y-4 shadow-xl"
      >
        <div className="flex items-center justify-between pb-3 border-b border-[#142A46]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Perfil do Concursando</h2>
              <p className="text-xs text-slate-400">Informações pessoais e objetivo de aprovação</p>
            </div>
          </div>

          {savedSuccess && (
            <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Salvo com sucesso!
            </span>
          )}
        </div>

        {/* PHOTO MANAGEMENT SUBSECTION */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#060D17] border border-[#142A46] space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            {/* Avatar Preview */}
            <div className="relative shrink-0 self-center sm:self-auto">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-[#00E5A3] shadow-[0_0_20px_rgba(0,229,163,0.35)] bg-[#0A1424] flex items-center justify-center">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={name || 'Foto de Perfil'}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-tr from-[#00E5A3] to-[#0084FF] flex items-center justify-center font-black text-2xl text-slate-900">
                    {(name || 'A').charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              {/* Camera quick upload badge */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                title="Trocar foto"
                className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-[#00E5A3] hover:bg-[#00c98f] text-slate-900 flex items-center justify-center shadow-lg border-2 border-[#060D17] transition-transform hover:scale-110 cursor-pointer"
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Actions & Description */}
            <div className="flex-1 space-y-2 text-center sm:text-left">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center justify-center sm:justify-start gap-1.5">
                  <span>Foto de Perfil</span>
                  {avatarUrl ? (
                    <span className="text-[10px] font-bold text-[#00E5A3] bg-[#00E5A3]/10 px-2 py-0.5 rounded-full border border-[#00E5A3]/20">
                      Personalizada
                    </span>
                  ) : (
                    <span className="text-[10px] font-medium text-slate-400 bg-slate-800/60 px-2 py-0.5 rounded-full border border-slate-700">
                      Iniciais
                    </span>
                  )}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                  Adicione sua foto pelo celular/computador ou escolha um dos avatares oficiais da enfermagem para personalizar sua experiência.
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
                {/* Hidden file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/webp"
                  onChange={handleFileUpload}
                  className="hidden"
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 rounded-xl bg-[#00E5A3] hover:bg-[#00c98f] text-slate-900 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-[0_2px_10px_rgba(0,229,163,0.25)]"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Escolher Foto</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowPresetPicker(prev => !prev);
                    setShowUrlInput(false);
                  }}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    showPresetPicker
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                      : 'bg-[#0F2238] hover:bg-[#162D4A] text-slate-200 border-[#1E3A5F]'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Avatares da Saúde</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowUrlInput(prev => !prev);
                    setShowPresetPicker(false);
                  }}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    showUrlInput
                      ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
                      : 'bg-[#0F2238] hover:bg-[#162D4A] text-slate-200 border-[#1E3A5F]'
                  }`}
                >
                  <LinkIcon className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Link Web</span>
                </button>

                {avatarUrl && (
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remover</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Feedback message banner */}
          {photoFeedback && (
            <div
              className={`p-3 rounded-xl text-xs font-semibold flex items-center gap-2 animate-fadeIn ${
                photoFeedback.isError
                  ? 'bg-rose-500/15 border border-rose-500/40 text-rose-300'
                  : 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-300'
              }`}
            >
              {photoFeedback.isError ? (
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              )}
              <span>{photoFeedback.text}</span>
            </div>
          )}

          {/* PRESET AVATARS SELECTOR DRAWER */}
          {showPresetPicker && (
            <div className="pt-3 border-t border-[#142A46] space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#00E5A3]" />
                  Selecione um Avatar Profissional de Enfermagem:
                </span>
                <button
                  type="button"
                  onClick={() => setShowPresetPicker(false)}
                  className="text-slate-400 hover:text-white p-1 rounded-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
                {AVATAR_PRESETS.map(preset => {
                  const isSelected = avatarUrl === preset.dataUrl;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => handleSelectPreset(preset.dataUrl)}
                      className={`relative p-2.5 rounded-2xl border flex flex-col items-center text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#00E5A3]/15 border-[#00E5A3] shadow-[0_0_15px_rgba(0,229,163,0.3)] ring-2 ring-[#00E5A3]/30'
                          : 'bg-[#0A1424] hover:bg-[#0F2238] border-[#162A46] hover:border-slate-500'
                      }`}
                    >
                      <div className="relative w-14 h-14 rounded-full overflow-hidden mb-2">
                        <img
                          src={preset.dataUrl}
                          alt={preset.name}
                          className="w-full h-full object-cover"
                        />
                        {isSelected && (
                          <div className="absolute inset-0 bg-[#00E5A3]/30 flex items-center justify-center">
                            <div className="w-5 h-5 rounded-full bg-[#00E5A3] text-slate-900 flex items-center justify-center shadow">
                              <Check className="w-3 h-3 stroke-[3]" />
                            </div>
                          </div>
                        )}
                      </div>
                      <span className="text-xs font-bold text-white leading-tight block truncate w-full">
                        {preset.name}
                      </span>
                      <span className="text-[10px] text-slate-400 leading-tight block truncate w-full mt-0.5">
                        {preset.role}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* DIRECT URL INPUT DRAWER */}
          {showUrlInput && (
            <div className="pt-3 border-t border-[#142A46] space-y-2 animate-fadeIn">
              <label className="block text-xs font-semibold text-slate-300">
                Cole o link direto da imagem na web (HTTPS):
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="url"
                  placeholder="https://exemplo.com/sua-foto.jpg"
                  value={urlInputValue}
                  onChange={e => setUrlInputValue(e.target.value)}
                  className="flex-1 bg-[#091526] border border-[#142A46] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#00E5A3]"
                />
                <button
                  type="button"
                  onClick={() => handleApplyUrl()}
                  className="px-4 py-2 rounded-xl bg-[#00E5A3] hover:bg-[#00c98f] text-slate-900 font-bold text-xs cursor-pointer transition-all"
                >
                  Aplicar
                </button>
                <button
                  type="button"
                  onClick={() => setShowUrlInput(false)}
                  className="px-3 py-2 rounded-xl bg-[#0F2238] hover:bg-[#162D4A] text-slate-300 text-xs cursor-pointer transition-all"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>

        {/* INPUT FIELDS: NOME, EMAIL, CONCURSO */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Nome de Exibição
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full bg-[#060D17] border border-[#142A46] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#00E5A3]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              E-mail Cadastrado
            </label>
            <input
              type="email"
              disabled
              value={user?.email || ''}
              className="w-full bg-[#060D17]/50 border border-[#142A46] rounded-xl px-3.5 py-2.5 text-sm text-slate-500 cursor-not-allowed"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Concurso Alvo / Objetivo
            </label>
            <input
              type="text"
              value={targetExam}
              onChange={e => setTargetExam(e.target.value)}
              placeholder="Ex: EBSERH / SUS Municipal / Residência em Enfermagem"
              className="w-full bg-[#060D17] border border-[#142A46] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#00E5A3]"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-[#00E5A3] hover:bg-[#00c98f] text-slate-900 font-extrabold text-xs flex items-center gap-1.5 shadow-[0_2px_12px_rgba(0,229,163,0.3)] transition-all cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Salvar Alterações</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setShowPasswordChange(!showPasswordChange);
              setPasswordChangeFeedback(null);
            }}
            className="px-4 py-2.5 rounded-xl bg-[#060D17] hover:bg-[#102238] border border-[#162D4A] hover:border-[#00E5A3]/50 text-xs font-bold text-slate-300 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <KeyRound className="w-3.5 h-3.5 text-[#00E5A3]" />
            <span>{showPasswordChange ? 'Ocultar Senha' : 'Alterar Senha de Acesso'}</span>
          </button>
        </div>

        {/* Change password subsection */}
        {showPasswordChange && (
          <div className="mt-4 pt-4 border-t border-[#142A46] space-y-3 bg-[#060D17] p-4 rounded-2xl border">
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-[#00E5A3]" />
              <span>Atualizar Senha da Conta ({user?.email})</span>
            </h4>

            {passwordChangeFeedback && (
              <div
                className={`p-3 rounded-xl text-xs font-semibold flex items-center gap-2 ${
                  passwordChangeFeedback.isError
                    ? 'bg-rose-500/15 border border-rose-500/40 text-rose-300'
                    : 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-300'
                }`}
              >
                {passwordChangeFeedback.isError ? (
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                )}
                <span>{passwordChangeFeedback.text}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                  Nova Senha
                </label>
                <input
                  type="password"
                  value={newPasswordVal}
                  onChange={e => setNewPasswordVal(e.target.value)}
                  placeholder="Mínimo 3 dígitos"
                  className="w-full bg-[#0A1424] border border-[#162942] rounded-xl px-3 py-2 text-xs text-white focus:border-[#00E5A3] outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                  Confirmar Nova Senha
                </label>
                <input
                  type="password"
                  value={confirmPasswordVal}
                  onChange={e => setConfirmPasswordVal(e.target.value)}
                  placeholder="Repita a nova senha"
                  className="w-full bg-[#0A1424] border border-[#162942] rounded-xl px-3 py-2 text-xs text-white focus:border-[#00E5A3] outline-none"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={async () => {
                if (!user?.email) return;
                if (!newPasswordVal || newPasswordVal.length < 3) {
                  setPasswordChangeFeedback({ text: 'A nova senha deve ter no mínimo 3 dígitos.', isError: true });
                  return;
                }
                if (newPasswordVal !== confirmPasswordVal) {
                  setPasswordChangeFeedback({ text: 'As senhas não conferem.', isError: true });
                  return;
                }
                const res = await changePassword(user.email, newPasswordVal);
                if (res.success) {
                  setPasswordChangeFeedback({ text: 'Senha alterada com sucesso e salva no banco de dados central!', isError: false });
                  setNewPasswordVal('');
                  setConfirmPasswordVal('');
                } else {
                  setPasswordChangeFeedback({ text: res.message, isError: true });
                }
              }}
              className="px-4 py-2 rounded-xl bg-[#00E5A3] text-slate-900 font-bold text-xs hover:bg-[#00c98f] transition-colors cursor-pointer"
            >
              Salvar Nova Senha
            </button>
          </div>
        )}
      </form>

      {/* SECTION: INSTALL APP / ADD TO HOME SCREEN */}
      <div className="bg-[#091526] border border-[#00E5A3]/30 rounded-3xl p-6 sm:p-7 space-y-4 shadow-xl">
        <div className="flex items-center justify-between pb-3 border-b border-[#142A46]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#00E5A3]/10 flex items-center justify-center text-[#00E5A3]">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Adicionar à Tela Inicial</h2>
              <p className="text-xs text-slate-400">
                Acesse o NEXTENF como um aplicativo nativo no celular ou computador
              </p>
            </div>
          </div>

          <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#00E5A3]/15 text-[#00E5A3] border border-[#00E5A3]/30 hidden sm:inline">
            PWA Disponível
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Instale o NEXTENF no seu dispositivo para abrir em tela cheia, receber lembretes de estudo e acessar instantaneamente sem precisar digitar o link no navegador.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <button
            type="button"
            onClick={() => {
              if (canInstallPwa) {
                promptPwaInstall();
              } else {
                setIsInstallModalOpen(true);
              }
            }}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00E5A3] to-[#00C2FF] text-[#060D17] font-extrabold text-xs flex items-center gap-2 shadow-[0_0_20px_rgba(0,229,163,0.3)] transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Instalar Aplicativo na Tela Inicial</span>
          </button>

          <button
            type="button"
            onClick={() => setIsInstallModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-[#060D17] hover:bg-[#102238] border border-[#162D4A] text-xs font-semibold text-slate-300 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Ver Instruções para iPhone / Android</span>
          </button>
        </div>
      </div>

      {/* SECTION: GUIDED TOUR REPLAY */}
      <div className="bg-[#091526] border border-[#0084FF]/30 rounded-3xl p-6 sm:p-7 space-y-4 shadow-xl">
        <div className="flex items-center justify-between pb-3 border-b border-[#142A46]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0084FF]/10 flex items-center justify-center text-[#0084FF]">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Tour Interativo da Plataforma</h2>
              <p className="text-xs text-slate-400">
                Apresentação guiada das ferramentas de memorização e simulados
              </p>
            </div>
          </div>

          <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#0084FF]/15 text-[#0084FF] border border-[#0084FF]/30 hidden sm:inline">
            Tutorial Guiado
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Reveja o tutorial passo a passo explicando como funciona o sistema de repetição espaçada dos flashcards 3D, a calibração dos 10 simulados (fácil/médio/difícil), os resumos express e o cronômetro do Modo Foco.
        </p>

        <div className="pt-1">
          <button
            type="button"
            onClick={startTour}
            className="px-5 py-2.5 rounded-xl bg-[#0084FF] hover:bg-sky-500 text-white font-bold text-xs flex items-center gap-2 shadow-[0_0_20px_rgba(0,132,255,0.3)] transition-all cursor-pointer"
          >
            <Compass className="w-4 h-4" />
            <span>Fazer Tour Guiado Novamente</span>
          </button>
        </div>
      </div>

      {/* SECTION 3: DATA RESET / DEMO MANAGEMENT */}
      <div className="bg-[#091526] border border-rose-500/20 rounded-3xl p-6 sm:p-7 space-y-4 shadow-xl">
        <div className="flex items-center gap-3 pb-3 border-b border-[#142A46]">
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-400">
            <RotateCcw className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Gerenciamento de Dados</h2>
            <p className="text-xs text-slate-400">
              Controle de progresso para teste do início 100% zerado
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Você pode redefinir todos os seus dados a qualquer momento para comprovar a experiência inicial 100% limpa, ou carregar dados de demonstração para testar os gráficos preenchidos.
        </p>

        {resetSuccessBanner && (
          <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>✓ Seus dados foram 100% zerados com sucesso! Contadores retornaram para 0.</span>
          </div>
        )}

        {demoSuccessBanner && (
          <div className="p-3.5 rounded-xl bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 text-xs font-bold flex items-center gap-2 animate-fadeIn">
            <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>✓ Dados de demonstração carregados com sucesso! Verifique a aba Meu Progresso.</span>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <button
            type="button"
            onClick={() => setShowResetModal(true)}
            className="px-4 py-2.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/40 text-xs font-bold text-rose-300 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Zerar Todos os Dados (Voltar a Zero)</span>
          </button>

          <button
            type="button"
            onClick={executeLoadDemo}
            className="px-4 py-2.5 rounded-xl bg-[#0F2238] hover:bg-[#162D4A] border border-[#162D4A] text-xs font-semibold text-slate-300 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#00E5A3]" />
            <span>Carregar Dados de Demonstração (Gráficos)</span>
          </button>
        </div>
      </div>

      {/* In-App Confirmation Modal for Reset (replaces window.confirm) */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#091526] border border-rose-500/40 rounded-3xl p-6 sm:p-7 max-w-md w-full space-y-4 shadow-2xl shadow-rose-950/40">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-white">
                  Zerar todos os dados de estudo?
                </h3>
                <p className="text-xs text-rose-300">Ação irreversível de limpeza</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Tem certeza que deseja redefinir seus dados? Seus contadores voltarão para <strong className="text-white">0 cards</strong>, <strong className="text-white">0 questões respondidas</strong>, <strong className="text-white">0h de estudo</strong> e todas as missões do checklist e sprint serão limpas.
            </p>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#142A46]">
              <button
                type="button"
                onClick={() => setShowResetModal(false)}
                className="px-4 py-2 rounded-xl bg-[#060D17] hover:bg-[#102238] text-xs font-semibold text-slate-300 border border-[#142A46] transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={executeResetAllStats}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-xs font-extrabold text-white shadow-lg shadow-rose-600/30 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Sim, Zerar Agora</span>
              </button>
            </div>
          </div>
        </div>
      )}
      {/* In-App Add Reminder Modal */}
      {showAddReminderModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <form
            onSubmit={handleAddNewReminder}
            className="bg-[#091526] border border-[#142A46] rounded-3xl p-6 sm:p-7 max-w-md w-full space-y-4 shadow-2xl"
          >
            <div className="flex items-center gap-3 pb-2 border-b border-[#142A46]">
              <div className="w-10 h-10 rounded-xl bg-[#00E5A3]/10 text-[#00E5A3] flex items-center justify-center shrink-0">
                <Plus className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-white">
                  Programar Novo Lembrete
                </h3>
                <p className="text-xs text-slate-400">Notificação diária no horário escolhido</p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Título do Alerta
              </label>
              <input
                type="text"
                required
                placeholder="Ex: 📚 Revisão de Farmacologia"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                className="w-full bg-[#060D17] border border-[#142A46] rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#00E5A3]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Horário Preferido
                </label>
                <input
                  type="time"
                  required
                  value={newTime}
                  onChange={e => setNewTime(e.target.value)}
                  className="w-full bg-[#060D17] border border-[#142A46] rounded-xl px-3.5 py-2 text-sm text-white font-mono focus:outline-none focus:border-[#00E5A3]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Categoria
                </label>
                <select
                  value={newCategory}
                  onChange={e => setNewCategory(e.target.value)}
                  className="w-full bg-[#060D17] border border-[#142A46] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00E5A3]"
                >
                  <option value="Flashcards">Flashcards</option>
                  <option value="Simulado">Simulado</option>
                  <option value="Checklist">Checklist</option>
                  <option value="Resumos">Resumos</option>
                  <option value="Geral">Geral</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Mensagem Motivacional da Notificação
              </label>
              <textarea
                rows={2}
                placeholder="Ex: Separe 15 minutos para resolver 5 questões de gotejamento!"
                value={newMessage}
                onChange={e => setNewMessage(e.target.value)}
                className="w-full bg-[#060D17] border border-[#142A46] rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#00E5A3] resize-none"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2 border-t border-[#142A46]">
              <button
                type="button"
                onClick={() => setShowAddReminderModal(false)}
                className="px-4 py-2 rounded-xl bg-[#060D17] hover:bg-[#102238] text-xs font-semibold text-slate-300 border border-[#142A46] transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-[#00E5A3] hover:bg-[#00c98f] text-slate-900 text-xs font-extrabold shadow-lg shadow-[#00E5A3]/20 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Salvar Lembrete</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
