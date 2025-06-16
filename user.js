document.addEventListener( "DOMContentLoaded", () =>
{
    const profileInfo = {
        name: "ABHISHEK ROY",
        mail: "aroy9756@gmail.com",
        link: "https://linkedin.com/in/aroyq",
        no: "+91-8276886958",
        img: "images/profile.jpg",
        imgAlt: "Abhishek Roy Profile"
    };

    // Update title and heading
    document.title = profileInfo.name;
    const nameHeaders = document.querySelectorAll( "h1" );
    nameHeaders.forEach( h1 =>
    {
        if ( h1.textContent.trim() === "NAME" )
        {
            h1.textContent = profileInfo.name;
        }
    } );
    // Update hrefs in contact links without changing their visible text
    document.querySelectorAll( ".contact-link" ).forEach( link =>
    {
        const label = link.textContent.trim().toLowerCase();

        if ( label === "email" )
        {
            link.href = `mailto:${ profileInfo.mail }`;
        } else if ( label === "linkedin" )
        {
            link.href = profileInfo.link;
        } else if ( label === "contact" )
        {
            link.href = `tel:${ profileInfo.no }`;
        }
    } );

    // Update profile image if exists
    const profileImg = document.querySelector( ".about-profile img" );
    if ( profileImg )
    {
        profileImg.src = profileInfo.img;
        profileImg.alt = profileInfo.imgAlt || profileInfo.name;
    }
} );