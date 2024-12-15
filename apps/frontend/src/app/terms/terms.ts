const name = process.env.NEXT_PUBLIC_NAME;
const contact_email = process.env.NEXT_PUBLIC_CONTACT_EMAIL
export const terms: { title: string; paragraphs: string[] }[] =
    [
        {
            title: " Introduction",
            paragraphs: [`
            ${name} is a community-driven platform where users can share and access links to resources. These Terms form a legal agreement between you ("User") and ${name}. By registering, accessing, or using the Platform, you agree to comply with these Terms.`]
        },
        {"title":"Will these Terms ever change?",
            paragraphs:["We are constantly trying to improve our Services, so these Terms may need to change along with the Services. We reserve the right to change the Terms at any time, but if we do, we will bring it to your attention by updating the terms on the roadmap.sh website, by sending you an email, and/or by some other means.",
                "If you don’t agree with the new Terms, you are free to reject them, however it means you will no longer be able to use the Services. If you use the Services in any way after a change to the Terms is effective, that means you agree to all of the changes.",
                
            ]
        },
        {
            title: "User Obligations",
            paragraphs: [`When using the Platform, you agree to`,
                '<li>Share only lawful and relevant resource</li>',
                '<li>Avoid sharing copyrighted content without proper permissions.</li>',
                '<li>Respect community members and avoid harassing, spamming, or discriminating against others.</li>',
                '<li>Ensure the accuracy of information in your profile and shared resources.</li>',
                'You must not:',
                '<li>Share malicious, misleading, or harmful content (e.g., malware or phishing links).</li>',
                '<li>Attempt to disrupt the Platform’s functionality or misuse features like votes or rankings.</li>'
            ],
        },
        {
            title: 'Content Ownership and Licensing',
            paragraphs: [
                '<b>User Responsibility:</b> You are solely responsible for the content you share. Ensure it complies with all applicable laws and these Terms.',
                `<b>Licensing:</b> By sharing content, you grant 
                ${name} a non-exclusive, royalty-free, worldwide license to display, distribute, and promote your content as part of the Platform's services.`,
                `<b> Copyright Violations: </b> If you believe your copyrighted work has been shared without permission, please contact us immediately at ${contact_email}.`
            ]

        }
        , {
            title: " Content Moderation",
            paragraphs: [
                'We strive to maintain a safe and respectful environment:',
                '<li><b>Content Review: </b> The Platform reserves the right to review, remove, or edit content that violates these Terms or is deemed inappropriate.</li>',
                '<li><b> Account Actions: </b> Repeated violations may lead to suspension or termination of your account.</li>'
            ]
        }
        , {
            title: "Acceptable Use Policy",
            paragraphs: [
                'To ensure a positive experience for all, you agree not to:',
                '<li>Exploit vulnerabilities, manipulate votes, or bypass security measures.</li>',
                '<li>Post content that is offensive, discriminatory, or incites harm</li>',
                '<li>Use automated tools to spam or scrape the Platform. </li>'
            ]
        },
        {
            title: "Liability Disclaimer",
            paragraphs: [`${name} does not guarantee the accuracy, reliability, or legality of resources shared by users.`,
                `The Platform is not liable for any damages or issues arising from reliance on user-shared content.`,
            `${name} may experience downtime or technical errors, and we are not liable for resulting disruptions`
            ]

        },
        {
            title: "Account Management",
            paragraphs: [
                "<b>Account Creation:</b> You must be fill your legit information . Providing false information may lead to account termination.",
                "<b>Account Termination :</b> We may suspend or terminate your account for violating these Terms or applicable laws.",
                "<b> Voluntary Deletion:</b> Users may delete their accounts at any time via the account settings page."
            ]

        }
        ,
        {
            title: "Third-Party Links",
            paragraphs: [`
The Platform may contain links to third-party websites. We do not endorse or control these websites and are not responsible for their content or practices. Use them at your own risk.`]
        }
        ,
    ]