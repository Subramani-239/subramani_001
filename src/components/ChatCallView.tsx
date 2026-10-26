/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  MessageCircle,
  Phone,
  Video,
  Send,
  Search,
  ShieldAlert,
  UserX,
  Flag,
  Check,
  CheckCheck,
  PhoneOff,
  VideoOff,
  Mic,
  MicOff,
  Camera,
  AlertCircle,
  HelpCircle,
  X,
  Volume2
} from 'lucide-react';
import { Language, ChatContact, ChatMessage } from '../types';
import { initialChatContacts, initialChatMessages } from '../data/chatCallData';
import { translations } from '../data/translations';
import { speakText } from '../utils/speech';

interface ChatCallViewProps {
  lang: Language;
  initialContactId?: string;
}

export const ChatCallView: React.FC<ChatCallViewProps> = ({ lang, initialContactId }) => {
  const t = translations[lang];

  // Contact list state
  const [contacts, setContacts] = useState<ChatContact[]>(() => {
    try {
      const saved = localStorage.getItem('sherise_chat_contacts');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return initialChatContacts;
  });

  const [activeContactId, setActiveContactId] = useState<string>(initialContactId || 'contact-trainer-1');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  // Messages state
  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>(() => {
    try {
      const saved = localStorage.getItem('sherise_chat_messages');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return initialChatMessages;
  });

  const [inputText, setInputText] = useState('');
  const [blockedUsers, setBlockedUsers] = useState<string[]>([]);
  const [toastNotice, setToastNotice] = useState<string | null>(null);

  // Call simulation & Media testing modal
  const [activeCallType, setActiveCallType] = useState<'voice' | 'video' | null>(null);
  const [callConnected, setCallConnected] = useState(false);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [mediaError, setMediaError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeContact = contacts.find((c) => c.id === activeContactId) || contacts[0];
  const activeChatList = messages[activeContactId] || [];

  useEffect(() => {
    try {
      localStorage.setItem('sherise_chat_messages', JSON.stringify(messages));
    } catch {
      // ignore
    }
  }, [messages]);

  useEffect(() => {
    try {
      localStorage.setItem('sherise_chat_contacts', JSON.stringify(contacts));
    } catch {
      // ignore
    }
  }, [contacts]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChatList]);

  // Clean up media streams
  useEffect(() => {
    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [mediaStream]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: 'me',
      receiverId: activeContactId,
      text: inputText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'delivered',
    };

    const updatedList = [...activeChatList, newMsg];
    setMessages({
      ...messages,
      [activeContactId]: updatedList,
    });
    setInputText('');

    // Simulate trainer auto-acknowledgment if chatting with trainer
    if (activeContact.category === 'trainer') {
      setTimeout(() => {
        const replyMsg: ChatMessage = {
          id: `reply-${Date.now()}`,
          senderId: activeContactId,
          receiverId: 'me',
          text:
            lang === 'ta'
              ? `நன்றி சகோதரி! உங்கள் செய்தி கிடைத்தது ("${newMsg.text}"). நான் விரைவில் விரிவான விளக்கம் அளிக்கிறேன்.`
              : lang === 'hi'
              ? `धन्यवाद बहन! आपका संदेश मिल गया। मैं जल्द ही पूरी जानकारी के साथ उत्तर दूंगी।`
              : `Thank you sister! Received your question. I will guide you through this step shortly.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: 'read',
        };
        setMessages((prev) => ({
          ...prev,
          [activeContactId]: [...(prev[activeContactId] || []), replyMsg],
        }));
      }, 1500);
    }
  };

  const handleStartCall = async (type: 'voice' | 'video') => {
    setActiveCallType(type);
    setCallConnected(false);
    setMediaError(null);

    // Request actual browser media stream if supported to test camera/microphone
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: type === 'video',
          audio: true,
        });
        setMediaStream(stream);
        setCallConnected(true);
        if (videoRef.current && type === 'video') {
          videoRef.current.srcObject = stream;
        }
      } catch (err: any) {
        // Permission denied or no camera, still show simulated connection with note
        setMediaError(
          lang === 'ta'
            ? 'கேமரா/மைக் அனுமதி வழங்கப்படவில்லை. மாதிரி அழைப்பு மட்டும் காட்டப்படுகிறது.'
            : 'Camera/Mic permission not granted. Running in simulated call mode.'
        );
        setTimeout(() => setCallConnected(true), 1200);
      }
    } else {
      setTimeout(() => setCallConnected(true), 1200);
    }
  };

  const handleEndCall = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => track.stop());
      setMediaStream(null);
    }
    setActiveCallType(null);
    setCallConnected(false);
  };

  const handleBlockUser = () => {
    if (!blockedUsers.includes(activeContactId)) {
      setBlockedUsers([...blockedUsers, activeContactId]);
      setToastNotice(t.chatCall.userBlockedNotice);
      setTimeout(() => setToastNotice(null), 3500);
    }
  };

  const handleReportUser = () => {
    setToastNotice(t.chatCall.reportSubmittedNotice);
    setTimeout(() => setToastNotice(null), 3500);
  };

  const filteredContacts = contacts.filter((c) => {
    if (blockedUsers.includes(c.id)) return false;
    if (filterCategory !== 'all' && c.category !== filterCategory) return false;
    if (searchQuery.trim()) {
      return (
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.role.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-rose-700 rounded-3xl p-6 sm:p-8 text-white shadow-md">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 rounded-full text-xs font-semibold mb-2">
            <MessageCircle className="w-3.5 h-3.5 text-amber-300" />
            <span>{t.common.demoBadge}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight mb-2">
            {t.chatCall.title}
          </h1>
          <p className="text-xs sm:text-sm text-purple-100 leading-relaxed">
            {t.chatCall.sub}
          </p>
        </div>
      </div>

      {/* Honest Prototype Notice & Architecture Explanation */}
      <div className="p-4 bg-purple-50 border border-purple-200 rounded-2xl flex items-start gap-3 text-xs text-purple-950">
        <AlertCircle className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold block">{t.chatCall.demoNotice}</span>
          <p className="text-[11px] text-purple-900 leading-relaxed">
            {lang === 'ta'
              ? 'உண்மையான நிகழ்நேர அழைப்புக்கு (Production) ஒரு WebSocket சிக்னலிங் சர்வர் அல்லது Firebase Realtime Database தேவைப்படுகிறது. இங்கு சாதனத்திலேயே பாதுகாப்பாக மாதிரி உரையாடலை பரிசோதிக்கலாம்.'
              : 'Production Note: Real-time peer-to-peer audio/video requires a WebRTC signaling server (e.g. PeerJS, Socket.io, or Firebase). The interactive demo below verifies your camera/mic and messaging interface locally.'}
          </p>
        </div>
      </div>

      {toastNotice && (
        <div className="p-3.5 bg-emerald-100 border border-emerald-300 rounded-2xl text-xs font-bold text-emerald-950 flex items-center gap-2 animate-fadeIn">
          <Check className="w-4 h-4 text-emerald-700" />
          <span>{toastNotice}</span>
        </div>
      )}

      {/* Main Chat Interface: Sidebar Contacts + Chat Window */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-md overflow-hidden grid grid-cols-1 md:grid-cols-3 min-h-[580px]">
        {/* Left: Contact Directory */}
        <div className="border-r border-stone-200 flex flex-col bg-stone-50/50">
          {/* Search bar */}
          <div className="p-3.5 border-b border-stone-200 bg-white">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.chatCall.searchPlaceholder}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Category filter pills */}
            <div className="flex items-center gap-1 mt-2.5 overflow-x-auto text-[11px]">
              {[
                { id: 'all', label: t.chatCall.tabs.all },
                { id: 'trainer', label: t.chatCall.tabs.trainers },
                { id: 'mentor', label: t.chatCall.tabs.mentors },
                { id: 'peer', label: t.chatCall.tabs.peers },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilterCategory(tab.id)}
                  className={`px-2 py-0.5 rounded-lg font-bold transition whitespace-nowrap ${
                    filterCategory === tab.id
                      ? 'bg-purple-600 text-white'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contacts list */}
          <div className="flex-1 overflow-y-auto divide-y divide-stone-100">
            {filteredContacts.map((contact) => {
              const isSelected = contact.id === activeContactId;
              return (
                <div
                  key={contact.id}
                  onClick={() => setActiveContactId(contact.id)}
                  className={`p-3.5 cursor-pointer flex items-center gap-3 transition ${
                    isSelected ? 'bg-purple-50/80 border-l-4 border-purple-600' : 'hover:bg-stone-100/70'
                  }`}
                >
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-500 to-rose-500 text-white font-extrabold text-sm flex items-center justify-center shrink-0 shadow-xs">
                    {contact.avatarSeed}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-stone-900 truncate">
                        {contact.name}
                      </h4>
                      <span className="text-[10px] text-stone-400">
                        {contact.lastMessageTime}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-500 truncate">
                      {lang === 'ta' ? contact.roleTa : lang === 'hi' ? contact.roleHi : contact.role}
                    </p>
                    <p className="text-[11px] text-stone-600 truncate italic">
                      {contact.lastMessage}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Active Chat Conversation */}
        <div className="md:col-span-2 flex flex-col h-full bg-white">
          {/* Conversation Header */}
          <div className="p-3.5 border-b border-stone-200 flex items-center justify-between bg-white">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-purple-500 to-rose-500 text-white font-bold text-xs flex items-center justify-center">
                {activeContact.avatarSeed}
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-stone-900">
                  {activeContact.name}
                </h3>
                <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{activeContact.statusText}</span>
                </span>
              </div>
            </div>

            {/* Call & Safety actions */}
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => handleStartCall('voice')}
                className="p-2 text-stone-600 hover:text-purple-600 rounded-xl hover:bg-purple-50 transition"
                title={t.chatCall.voiceCallBtn}
                aria-label={t.chatCall.voiceCallBtn}
              >
                <Phone className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleStartCall('video')}
                className="p-2 text-stone-600 hover:text-purple-600 rounded-xl hover:bg-purple-50 transition"
                title={t.chatCall.videoCallBtn}
                aria-label={t.chatCall.videoCallBtn}
              >
                <Video className="w-4 h-4" />
              </button>

              <button
                onClick={handleBlockUser}
                className="p-2 text-stone-400 hover:text-red-600 rounded-xl hover:bg-red-50 transition"
                title={t.chatCall.blockContact}
                aria-label={t.chatCall.blockContact}
              >
                <UserX className="w-4 h-4" />
              </button>

              <button
                onClick={handleReportUser}
                className="p-2 text-stone-400 hover:text-amber-600 rounded-xl hover:bg-amber-50 transition"
                title={t.chatCall.reportContact}
                aria-label={t.chatCall.reportContact}
              >
                <Flag className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Message Thread */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-stone-50/30">
            {activeChatList.map((msg) => {
              const isMe = msg.senderId === 'me';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed shadow-2xs ${
                      isMe
                        ? 'bg-purple-600 text-white rounded-br-xs'
                        : 'bg-white border border-stone-200 text-stone-800 rounded-bl-xs'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <div
                      className={`flex items-center justify-end gap-1 text-[9px] mt-1 ${
                        isMe ? 'text-purple-200' : 'text-stone-400'
                      }`}
                    >
                      <span>{msg.timestamp}</span>
                      {isMe && (
                        <span>
                          {msg.status === 'read' ? (
                            <CheckCheck className="w-3 h-3 text-cyan-300" />
                          ) : (
                            <Check className="w-3 h-3 text-purple-200" />
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input Box */}
          <form
            onSubmit={handleSendMessage}
            className="p-3 border-t border-stone-200 flex items-center gap-2 bg-white"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={t.chatCall.typeMessagePlaceholder}
              className="flex-1 text-xs p-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2.5 bg-purple-600 disabled:opacity-50 hover:bg-purple-700 text-white rounded-xl shadow-xs transition"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Interactive Call Testing Modal (Simulated + Camera preview where supported) */}
      {activeCallType && (
        <div
          role="dialog"
          aria-label="Call in progress"
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
        >
          <div className="bg-stone-900 border border-stone-800 rounded-3xl max-w-lg w-full p-6 text-white text-center space-y-6 shadow-2xl">
            <div className="flex items-center justify-between text-xs text-stone-400">
              <span className="font-bold uppercase tracking-wider text-purple-400">
                {activeCallType === 'video' ? 'Video Call' : 'Voice Call'} (Demo)
              </span>
              <span>{activeContact.name}</span>
            </div>

            {/* Video or Avatar Display */}
            {activeCallType === 'video' ? (
              <div className="w-full h-56 bg-stone-800 rounded-2xl overflow-hidden relative border border-stone-700 flex items-center justify-center">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
                {!mediaStream && (
                  <div className="text-stone-400 text-xs flex flex-col items-center gap-2">
                    <Camera className="w-8 h-8 text-stone-500 animate-pulse" />
                    <span>{t.chatCall.callActive}</span>
                  </div>
                )}
                <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-0.5 rounded text-[10px] text-white">
                  Local Camera Stream
                </div>
              </div>
            ) : (
              <div className="py-6 flex flex-col items-center gap-3">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-purple-500 to-rose-500 text-white font-extrabold text-2xl flex items-center justify-center shadow-lg animate-pulse">
                  {activeContact.avatarSeed}
                </div>
                <h3 className="text-base font-bold">{activeContact.name}</h3>
                <p className="text-xs text-emerald-400 font-semibold">
                  {callConnected ? t.chatCall.callActive : t.chatCall.callConnecting}
                </p>
              </div>
            )}

            {mediaError && (
              <p className="text-[11px] text-amber-300 bg-stone-800/80 p-2 rounded-xl">
                {mediaError}
              </p>
            )}

            {/* End Call Button */}
            <div className="pt-2 flex justify-center">
              <button
                onClick={handleEndCall}
                className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-full shadow-lg transition active:scale-95"
              >
                <PhoneOff className="w-4 h-4" />
                <span>{t.chatCall.hangUp}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
