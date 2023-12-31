import styles from '@/styles/Home.module.css'
import PushNotificationLayout from '../components/PushNotificationLayout'

export default function Home() {
  return (
    <PushNotificationLayout>
      <div className={styles.container}>
        <main className={styles.main}>
          <h2>Queen Home Page</h2>
        </main>
      </div>
    </PushNotificationLayout>
  );
}
