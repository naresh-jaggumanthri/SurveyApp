import { useEffect, useState, useCallback, useRef } from 'react';
import * as Keychain from 'react-native-keychain';

const SERVICE = 'login_lockout';
const MAX_ATTEMPTS = 5;
const LOCK_MS = 15 * 60 * 1000;

export default function useLoginLockout() {
  const [attempts, setAttempts] = useState(0);
  const [lockUntil, setLockUntil] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const timer = useRef(null);

  // Restore state on mount
  useEffect(() => {
    (async () => {
      try {
        const creds = await Keychain.getGenericPassword({ service: SERVICE });
        if (creds) {
          const s = JSON.parse(creds.password);
          setAttempts(s.attempts || 0);
          setLockUntil(s.lockUntil || 0);
        }
      } catch {}
    })();
  }, []);

  const persist = (a, l) =>
    Keychain.setGenericPassword('lockout', JSON.stringify({ attempts: a, lockUntil: l }), {
      service: SERVICE,
    }).catch(() => {});

  // Countdown ticker
  useEffect(() => {
    clearInterval(timer.current);
    const tick = () => {
      const left = Math.max(0, lockUntil - Date.now());
      setRemaining(left);
      if (left === 0 && lockUntil !== 0) {
        setLockUntil(0);
        setAttempts(0);
        persist(0, 0);
        clearInterval(timer.current);
      }
    };
    tick();
    if (lockUntil > Date.now()) timer.current = setInterval(tick, 1000);
    return () => clearInterval(timer.current);
  }, [lockUntil]);

  const registerFailure = useCallback(() => {
    const next = attempts + 1;
    if (next >= MAX_ATTEMPTS) {
      const until = Date.now() + LOCK_MS;
      setAttempts(next);
      setLockUntil(until);
      persist(next, until);
    } else {
      setAttempts(next);
      persist(next, 0);
    }
  }, [attempts]);

  // Use when the server says "locked" (429 / Retry-After)
  const lockFor = useCallback(
    (ms) => {
      const until = Date.now() + ms;
      setLockUntil(until);
      persist(attempts, until);
    },
    [attempts]
  );

  const reset = useCallback(() => {
    setAttempts(0);
    setLockUntil(0);
    persist(0, 0);
  }, []);

  return {
    isLocked: remaining > 0,
    remainingSeconds: Math.ceil(remaining / 1000),
    attemptsLeft: Math.max(0, MAX_ATTEMPTS - attempts),
    registerFailure,
    lockFor,
    reset,
  };
}