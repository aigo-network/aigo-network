/**
 * 1. Description
 * We store users' seed phrases using the threshold key encryption technique, which incorporates
 * Shamir's Secret Sharing and additional encryption algorithms.
 *
 * The secret (seed phrase) will be split into shares and distributed/stored as follows:
 * - Share A will be encrypted using ROCKET_PUBLIC_KEY with asymmetric encryption and stored in our backend.
 * - Share B will be encrypted with the user’s passcode, then encrypted again with ROCKET_PUBLIC_KEY as described above
 *   and stored in our backend. Additionally, this encrypted share will also be stored on the user's device.
 *
 * With a threshold of 2, users need at least 2 shares to reconstruct the secret.
 *
 * In normal cases, the user will have a key share fetched from the Rocket API, which is only available at runtime.
 * The other key share is stored on the device. If a transaction signing is required, we will prompt the user for their
 * passcode to reconstruct the share. With enough shares, we can then reconstruct the seed phrase and derive the private
 * key for signing purposes.
 *
 * When signing in from a new device, the app needs to fetch 2 key shares from the backend and use the passcode to
 * reconstruct one share, allowing the secret to be reconstructed.
 *
 *
 * 2. Considerations
 * This threshold key encryption method is considered a semi-custodial wallet. The app and backend cannot reconstruct
 * the user's seed phrase without the user’s passcode. The encrypted shares stored in our backend serve as a secure backup
 * for the seed phrase. However, users may lose access to their keys if our server is discontinued or if they forget
 * their passcode. The distributed shares are bound to the user through their authentication identity, which is linked
 * to Firebase user identity.
 *
 * - On the device side, we could store the seed phrase and private key, encrypting them with a passcode. This would ensure
 *   that the shares stored in the backend function as a secure backup.
 *
 * - We could send a share to the user via email, enhancing self-custody, as they could reconstruct the key without needing
 *   to request a share from the backend. However, this still requires the binding of user shares, which might be resolved
 *   through decentralized storage.
 *
 * - We only temporarily store the passcode-encrypted share; we need to eliminate it by sending it via email or by
 *   requesting an advanced backup from the user.
 *
 *
 * 3. Alternative Approach
 * We could consider using the user's passcode to encrypt the entire seed phrase and store it.
 *
 */

