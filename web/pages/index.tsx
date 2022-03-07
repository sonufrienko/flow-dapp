// @ts-ignore
import * as fcl from '@onflow/fcl';
import '../config/index';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  const [user, setUser] = useState<any>(null);
  const [account, setAccount] = useState<any>(null);

  useEffect(() => {
    fcl.currentUser().subscribe(async (currentUser: any) => {
      if (currentUser.addr) {
        setUser(currentUser);
        const currentAccount = await fcl.account(currentUser.addr);
        setAccount(currentAccount);
        console.log({
          currentUser,
          currentAccount,
        });
      }
    });
  }, [setUser, setAccount]);

  async function login() {
    try {
      const u = await fcl.logIn();
      console.log(u);
    } catch (e) {
      console.error(e);
    }
  }

  async function logout() {
    try {
      await fcl.unauthenticate();
    } catch (e) {
      console.error(e);
    }
    setUser(null);
    setAccount(null);
  }

  return (
    <div className={styles.container}>
      <p>
        <div>User: {user ? user.addr : '-'}</div>
        <div>Balance: {account ? account.balance : '-'}</div>
        {!user && <button onClick={login}>Sign in</button>}
        {user && <button onClick={logout}>Sign out</button>}
      </p>

      <footer className={styles.footer}>Powered by Human Kind</footer>
    </div>
  );
};

export default Home;
