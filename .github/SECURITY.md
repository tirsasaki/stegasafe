# Security Policy

## Supported Versions

StegaSafe is currently maintained as a continuously deployed web application.
Security fixes are applied to the latest version on the `main` branch and the
current production deployment. Older commits, forks, and modified deployments
are not supported by this policy.

| Version | Supported |
| --- | --- |
| Latest `main` / production | Yes |
| Older commits and forks | No |

## Reporting a Vulnerability

Please do not disclose suspected vulnerabilities in a public issue, discussion,
pull request, or social media post.

Use GitHub's private vulnerability reporting feature:

1. Open the repository's **Security** tab.
2. Select **Advisories**.
3. Select **Report a vulnerability**.
4. Provide the information requested below.

If private vulnerability reporting is not available, open a public issue asking
the maintainer for a private contact channel, but do not include vulnerability
details or sensitive data.

Please include:

- A concise description of the vulnerability and its potential impact.
- Reproduction steps or a minimal proof of concept.
- The affected URL, commit, browser, operating system, and device where relevant.
- Whether the issue could expose images, messages, passwords, encryption keys, or
  other user data.
- Any suggested mitigation, if known.

Use synthetic test images, messages, and passwords. Do not submit real secrets,
personal images, credentials, or data belonging to another person.

## Response Process

The maintainer will make a best effort to:

- Acknowledge a complete report within 7 days.
- Provide an initial assessment within 14 days.
- Keep the reporter informed when remediation takes longer.
- Coordinate publication after a fix is available.

These are response targets, not guarantees. StegaSafe currently does not offer a
paid bug bounty or compensation program.

## Security Scope

Reports are especially helpful when they concern:

- Unexpected transmission or storage of images, messages, or passwords.
- Weaknesses in AES-GCM encryption, PBKDF2 key derivation, payload integrity, or
  random salt and IV generation.
- Incorrect payload parsing that could cause data exposure or arbitrary code
  execution.
- Cross-site scripting, dependency vulnerabilities, or unsafe browser APIs.
- Bypasses of PNG validation, file-size limits, or processing isolation.
- Differences between the documented privacy behavior and actual behavior.

The following are generally expected limitations rather than vulnerabilities:

- LSB steganography being detectable through specialist analysis.
- Hidden messages being damaged by resizing, editing, recompression, conversion,
  screenshots, or social-media processing.
- Inability to recover a forgotten password.
- Analytics requests being blocked by privacy tools or ad blockers.
- Issues that require a user to paste attacker-controlled code into DevTools.
- Reports based only on automated scanner output without a reproducible security
  impact.

## Coordinated Disclosure

Please allow reasonable time for investigation and remediation before public
disclosure. The maintainer may credit the reporter in a security advisory or
release note unless anonymity is requested.
