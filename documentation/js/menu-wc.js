'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">module1 documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AppModule-1710b218d8c00cbe9aea3850773be756ec6046e43afb4a0f7de413235fe858d5ad59704924ae51a6d21f0df7f459b8e530d73cacde12f13b27df13cdc1f86920"' : 'data-target="#xs-controllers-links-module-AppModule-1710b218d8c00cbe9aea3850773be756ec6046e43afb4a0f7de413235fe858d5ad59704924ae51a6d21f0df7f459b8e530d73cacde12f13b27df13cdc1f86920"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-1710b218d8c00cbe9aea3850773be756ec6046e43afb4a0f7de413235fe858d5ad59704924ae51a6d21f0df7f459b8e530d73cacde12f13b27df13cdc1f86920"' :
                                            'id="xs-controllers-links-module-AppModule-1710b218d8c00cbe9aea3850773be756ec6046e43afb4a0f7de413235fe858d5ad59704924ae51a6d21f0df7f459b8e530d73cacde12f13b27df13cdc1f86920"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-1710b218d8c00cbe9aea3850773be756ec6046e43afb4a0f7de413235fe858d5ad59704924ae51a6d21f0df7f459b8e530d73cacde12f13b27df13cdc1f86920"' : 'data-target="#xs-injectables-links-module-AppModule-1710b218d8c00cbe9aea3850773be756ec6046e43afb4a0f7de413235fe858d5ad59704924ae51a6d21f0df7f459b8e530d73cacde12f13b27df13cdc1f86920"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-1710b218d8c00cbe9aea3850773be756ec6046e43afb4a0f7de413235fe858d5ad59704924ae51a6d21f0df7f459b8e530d73cacde12f13b27df13cdc1f86920"' :
                                        'id="xs-injectables-links-module-AppModule-1710b218d8c00cbe9aea3850773be756ec6046e43afb4a0f7de413235fe858d5ad59704924ae51a6d21f0df7f459b8e530d73cacde12f13b27df13cdc1f86920"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModuleFixture.html" data-type="entity-link" >AppModuleFixture</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AuthModule-3a64b9b7f54003eb304320fcb77a70d646e5b08bfba2660823d06938d1488be901670373a592d586c19a617d9b1ae01ea5c39a5ba4653c5039bfd409aa44918c"' : 'data-target="#xs-controllers-links-module-AuthModule-3a64b9b7f54003eb304320fcb77a70d646e5b08bfba2660823d06938d1488be901670373a592d586c19a617d9b1ae01ea5c39a5ba4653c5039bfd409aa44918c"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-3a64b9b7f54003eb304320fcb77a70d646e5b08bfba2660823d06938d1488be901670373a592d586c19a617d9b1ae01ea5c39a5ba4653c5039bfd409aa44918c"' :
                                            'id="xs-controllers-links-module-AuthModule-3a64b9b7f54003eb304320fcb77a70d646e5b08bfba2660823d06938d1488be901670373a592d586c19a617d9b1ae01ea5c39a5ba4653c5039bfd409aa44918c"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/AuthGithubController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthGithubController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthModule-3a64b9b7f54003eb304320fcb77a70d646e5b08bfba2660823d06938d1488be901670373a592d586c19a617d9b1ae01ea5c39a5ba4653c5039bfd409aa44918c"' : 'data-target="#xs-injectables-links-module-AuthModule-3a64b9b7f54003eb304320fcb77a70d646e5b08bfba2660823d06938d1488be901670373a592d586c19a617d9b1ae01ea5c39a5ba4653c5039bfd409aa44918c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-3a64b9b7f54003eb304320fcb77a70d646e5b08bfba2660823d06938d1488be901670373a592d586c19a617d9b1ae01ea5c39a5ba4653c5039bfd409aa44918c"' :
                                        'id="xs-injectables-links-module-AuthModule-3a64b9b7f54003eb304320fcb77a70d646e5b08bfba2660823d06938d1488be901670373a592d586c19a617d9b1ae01ea5c39a5ba4653c5039bfd409aa44918c"' }>
                                        <li class="link">
                                            <a href="injectables/AuthGithubStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthGithubStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LocalAuthGuard.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LocalAuthGuard</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LocalStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LocalStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/EmailModule.html" data-type="entity-link" >EmailModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/FederatedModule.html" data-type="entity-link" >FederatedModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-FederatedModule-0269813f7a5363d061d470eb00890760f40b5c682673529daaa9a1e3f8d43ca757a96b657931845b106715e9010cd7733fbfbcd0247a00bf50037ca50052a6cc"' : 'data-target="#xs-injectables-links-module-FederatedModule-0269813f7a5363d061d470eb00890760f40b5c682673529daaa9a1e3f8d43ca757a96b657931845b106715e9010cd7733fbfbcd0247a00bf50037ca50052a6cc"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-FederatedModule-0269813f7a5363d061d470eb00890760f40b5c682673529daaa9a1e3f8d43ca757a96b657931845b106715e9010cd7733fbfbcd0247a00bf50037ca50052a6cc"' :
                                        'id="xs-injectables-links-module-FederatedModule-0269813f7a5363d061d470eb00890760f40b5c682673529daaa9a1e3f8d43ca757a96b657931845b106715e9010cd7733fbfbcd0247a00bf50037ca50052a6cc"' }>
                                        <li class="link">
                                            <a href="injectables/FederatedService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FederatedService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/HandlebarEmailModule.html" data-type="entity-link" >HandlebarEmailModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-HandlebarEmailModule-05eca2d17e4aaccb35ba5da721715a64cd2279033edcc5d2fa8d4854b0985d73fbbd965020c56484c8da3944679d8556044e8e4fd1ee98b4ef015fba38dbf965"' : 'data-target="#xs-injectables-links-module-HandlebarEmailModule-05eca2d17e4aaccb35ba5da721715a64cd2279033edcc5d2fa8d4854b0985d73fbbd965020c56484c8da3944679d8556044e8e4fd1ee98b4ef015fba38dbf965"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-HandlebarEmailModule-05eca2d17e4aaccb35ba5da721715a64cd2279033edcc5d2fa8d4854b0985d73fbbd965020c56484c8da3944679d8556044e8e4fd1ee98b4ef015fba38dbf965"' :
                                        'id="xs-injectables-links-module-HandlebarEmailModule-05eca2d17e4aaccb35ba5da721715a64cd2279033edcc5d2fa8d4854b0985d73fbbd965020c56484c8da3944679d8556044e8e4fd1ee98b4ef015fba38dbf965"' }>
                                        <li class="link">
                                            <a href="injectables/HandlebarEmailService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HandlebarEmailService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/LoggerModule.html" data-type="entity-link" >LoggerModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-LoggerModule-2da6a1df96b7d710ba85599fdffc010afaf9468090d8d5753d5f1042ed068bf2eeb97fa1468691d4dd54219a038c2a2a500b1d79a54eb9a35fd777484b6b90eb"' : 'data-target="#xs-injectables-links-module-LoggerModule-2da6a1df96b7d710ba85599fdffc010afaf9468090d8d5753d5f1042ed068bf2eeb97fa1468691d4dd54219a038c2a2a500b1d79a54eb9a35fd777484b6b90eb"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-LoggerModule-2da6a1df96b7d710ba85599fdffc010afaf9468090d8d5753d5f1042ed068bf2eeb97fa1468691d4dd54219a038c2a2a500b1d79a54eb9a35fd777484b6b90eb"' :
                                        'id="xs-injectables-links-module-LoggerModule-2da6a1df96b7d710ba85599fdffc010afaf9468090d8d5753d5f1042ed068bf2eeb97fa1468691d4dd54219a038c2a2a500b1d79a54eb9a35fd777484b6b90eb"' }>
                                        <li class="link">
                                            <a href="injectables/LoggerSentryTransport.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoggerSentryTransport</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LoggerService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoggerService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LoggerTransportService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoggerTransportService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RoleModule.html" data-type="entity-link" >RoleModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-RoleModule-0859038d92ed9aeab9a8f82ab160595a7b9e258bdaf429daf6e38cc594dc7f66b6c05a1b8045a14bade8394e4ab2fc13b3cae515ff7dca614cd3933c4911b826"' : 'data-target="#xs-controllers-links-module-RoleModule-0859038d92ed9aeab9a8f82ab160595a7b9e258bdaf429daf6e38cc594dc7f66b6c05a1b8045a14bade8394e4ab2fc13b3cae515ff7dca614cd3933c4911b826"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-RoleModule-0859038d92ed9aeab9a8f82ab160595a7b9e258bdaf429daf6e38cc594dc7f66b6c05a1b8045a14bade8394e4ab2fc13b3cae515ff7dca614cd3933c4911b826"' :
                                            'id="xs-controllers-links-module-RoleModule-0859038d92ed9aeab9a8f82ab160595a7b9e258bdaf429daf6e38cc594dc7f66b6c05a1b8045a14bade8394e4ab2fc13b3cae515ff7dca614cd3933c4911b826"' }>
                                            <li class="link">
                                                <a href="controllers/RoleController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RoleController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-RoleModule-0859038d92ed9aeab9a8f82ab160595a7b9e258bdaf429daf6e38cc594dc7f66b6c05a1b8045a14bade8394e4ab2fc13b3cae515ff7dca614cd3933c4911b826"' : 'data-target="#xs-injectables-links-module-RoleModule-0859038d92ed9aeab9a8f82ab160595a7b9e258bdaf429daf6e38cc594dc7f66b6c05a1b8045a14bade8394e4ab2fc13b3cae515ff7dca614cd3933c4911b826"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RoleModule-0859038d92ed9aeab9a8f82ab160595a7b9e258bdaf429daf6e38cc594dc7f66b6c05a1b8045a14bade8394e4ab2fc13b3cae515ff7dca614cd3933c4911b826"' :
                                        'id="xs-injectables-links-module-RoleModule-0859038d92ed9aeab9a8f82ab160595a7b9e258bdaf429daf6e38cc594dc7f66b6c05a1b8045a14bade8394e4ab2fc13b3cae515ff7dca614cd3933c4911b826"' }>
                                        <li class="link">
                                            <a href="injectables/RoleService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RoleService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UploadModule.html" data-type="entity-link" >UploadModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-UploadModule-4f0536e446626ae50a7e47ad4475ba83d70df3285705fbfa306ea15e1f3d07b6a4b87f3389497f9371db16ffbe6475637a0906b63b4f03bf5127956b02a74a40"' : 'data-target="#xs-controllers-links-module-UploadModule-4f0536e446626ae50a7e47ad4475ba83d70df3285705fbfa306ea15e1f3d07b6a4b87f3389497f9371db16ffbe6475637a0906b63b4f03bf5127956b02a74a40"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UploadModule-4f0536e446626ae50a7e47ad4475ba83d70df3285705fbfa306ea15e1f3d07b6a4b87f3389497f9371db16ffbe6475637a0906b63b4f03bf5127956b02a74a40"' :
                                            'id="xs-controllers-links-module-UploadModule-4f0536e446626ae50a7e47ad4475ba83d70df3285705fbfa306ea15e1f3d07b6a4b87f3389497f9371db16ffbe6475637a0906b63b4f03bf5127956b02a74a40"' }>
                                            <li class="link">
                                                <a href="controllers/UploadController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UploadController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UploadModule-4f0536e446626ae50a7e47ad4475ba83d70df3285705fbfa306ea15e1f3d07b6a4b87f3389497f9371db16ffbe6475637a0906b63b4f03bf5127956b02a74a40"' : 'data-target="#xs-injectables-links-module-UploadModule-4f0536e446626ae50a7e47ad4475ba83d70df3285705fbfa306ea15e1f3d07b6a4b87f3389497f9371db16ffbe6475637a0906b63b4f03bf5127956b02a74a40"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UploadModule-4f0536e446626ae50a7e47ad4475ba83d70df3285705fbfa306ea15e1f3d07b6a4b87f3389497f9371db16ffbe6475637a0906b63b4f03bf5127956b02a74a40"' :
                                        'id="xs-injectables-links-module-UploadModule-4f0536e446626ae50a7e47ad4475ba83d70df3285705fbfa306ea15e1f3d07b6a4b87f3389497f9371db16ffbe6475637a0906b63b4f03bf5127956b02a74a40"' }>
                                        <li class="link">
                                            <a href="injectables/awsS3UploadService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >awsS3UploadService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-UserModule-7b34da105d325267eba55703c53883488a4afd09e050ed33180825ae10246bb263f58f41f364df2ad307062d3223c80048778b0e77fb6cd19be9a0c9698c6c3b"' : 'data-target="#xs-controllers-links-module-UserModule-7b34da105d325267eba55703c53883488a4afd09e050ed33180825ae10246bb263f58f41f364df2ad307062d3223c80048778b0e77fb6cd19be9a0c9698c6c3b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserModule-7b34da105d325267eba55703c53883488a4afd09e050ed33180825ae10246bb263f58f41f364df2ad307062d3223c80048778b0e77fb6cd19be9a0c9698c6c3b"' :
                                            'id="xs-controllers-links-module-UserModule-7b34da105d325267eba55703c53883488a4afd09e050ed33180825ae10246bb263f58f41f364df2ad307062d3223c80048778b0e77fb6cd19be9a0c9698c6c3b"' }>
                                            <li class="link">
                                                <a href="controllers/UserController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/UserReportController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserReportController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UserModule-7b34da105d325267eba55703c53883488a4afd09e050ed33180825ae10246bb263f58f41f364df2ad307062d3223c80048778b0e77fb6cd19be9a0c9698c6c3b"' : 'data-target="#xs-injectables-links-module-UserModule-7b34da105d325267eba55703c53883488a4afd09e050ed33180825ae10246bb263f58f41f364df2ad307062d3223c80048778b0e77fb6cd19be9a0c9698c6c3b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-7b34da105d325267eba55703c53883488a4afd09e050ed33180825ae10246bb263f58f41f364df2ad307062d3223c80048778b0e77fb6cd19be9a0c9698c6c3b"' :
                                        'id="xs-injectables-links-module-UserModule-7b34da105d325267eba55703c53883488a4afd09e050ed33180825ae10246bb263f58f41f364df2ad307062d3223c80048778b0e77fb6cd19be9a0c9698c6c3b"' }>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserRoleModule.html" data-type="entity-link" >UserRoleModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-UserRoleModule-a604854f297d6698476ae52e8b5b1d95d17d423196132b64360fe1bb395ae7113577653c454d2a2de21827d8a899151d612cbfc712d2346d358953d950fb55a1"' : 'data-target="#xs-controllers-links-module-UserRoleModule-a604854f297d6698476ae52e8b5b1d95d17d423196132b64360fe1bb395ae7113577653c454d2a2de21827d8a899151d612cbfc712d2346d358953d950fb55a1"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserRoleModule-a604854f297d6698476ae52e8b5b1d95d17d423196132b64360fe1bb395ae7113577653c454d2a2de21827d8a899151d612cbfc712d2346d358953d950fb55a1"' :
                                            'id="xs-controllers-links-module-UserRoleModule-a604854f297d6698476ae52e8b5b1d95d17d423196132b64360fe1bb395ae7113577653c454d2a2de21827d8a899151d612cbfc712d2346d358953d950fb55a1"' }>
                                            <li class="link">
                                                <a href="controllers/UserRoleController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserRoleController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UserRoleModule-a604854f297d6698476ae52e8b5b1d95d17d423196132b64360fe1bb395ae7113577653c454d2a2de21827d8a899151d612cbfc712d2346d358953d950fb55a1"' : 'data-target="#xs-injectables-links-module-UserRoleModule-a604854f297d6698476ae52e8b5b1d95d17d423196132b64360fe1bb395ae7113577653c454d2a2de21827d8a899151d612cbfc712d2346d358953d950fb55a1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserRoleModule-a604854f297d6698476ae52e8b5b1d95d17d423196132b64360fe1bb395ae7113577653c454d2a2de21827d8a899151d612cbfc712d2346d358953d950fb55a1"' :
                                        'id="xs-injectables-links-module-UserRoleModule-a604854f297d6698476ae52e8b5b1d95d17d423196132b64360fe1bb395ae7113577653c454d2a2de21827d8a899151d612cbfc712d2346d358953d950fb55a1"' }>
                                        <li class="link">
                                            <a href="injectables/UserRoleService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserRoleService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#controllers-links"' :
                                'data-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/EmailController.html" data-type="entity-link" >EmailController</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#entities-links"' :
                                'data-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/Federated.html" data-type="entity-link" >Federated</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Role.html" data-type="entity-link" >Role</a>
                                </li>
                                <li class="link">
                                    <a href="entities/User.html" data-type="entity-link" >User</a>
                                </li>
                                <li class="link">
                                    <a href="entities/UserRole.html" data-type="entity-link" >UserRole</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AddResetToken1665198934490.html" data-type="entity-link" >AddResetToken1665198934490</a>
                            </li>
                            <li class="link">
                                <a href="classes/AuthEmailDto.html" data-type="entity-link" >AuthEmailDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/AuthLoginDto.html" data-type="entity-link" >AuthLoginDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/AuthLoginInterface.html" data-type="entity-link" >AuthLoginInterface</a>
                            </li>
                            <li class="link">
                                <a href="classes/AuthRefreshDto.html" data-type="entity-link" >AuthRefreshDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/AuthResponseDto.html" data-type="entity-link" >AuthResponseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/AuthUpdatePasswordDto.html" data-type="entity-link" >AuthUpdatePasswordDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CommonEntity.html" data-type="entity-link" >CommonEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/CommonEntityDto.html" data-type="entity-link" >CommonEntityDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateRoleDto.html" data-type="entity-link" >CreateRoleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserRoleDto.html" data-type="entity-link" >CreateUserRoleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CryptUtil.html" data-type="entity-link" >CryptUtil</a>
                            </li>
                            <li class="link">
                                <a href="classes/EmailDto.html" data-type="entity-link" >EmailDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ErrorCodeExceptionFilter.html" data-type="entity-link" >ErrorCodeExceptionFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/Federated1665882607149.html" data-type="entity-link" >Federated1665882607149</a>
                            </li>
                            <li class="link">
                                <a href="classes/FederatedCreateDto.html" data-type="entity-link" >FederatedCreateDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/FederatedDto.html" data-type="entity-link" >FederatedDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/FederatedUpdateDto.html" data-type="entity-link" >FederatedUpdateDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/FileResponseDto.html" data-type="entity-link" >FileResponseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/initTables1664757497775.html" data-type="entity-link" >initTables1664757497775</a>
                            </li>
                            <li class="link">
                                <a href="classes/Role.html" data-type="entity-link" >Role</a>
                            </li>
                            <li class="link">
                                <a href="classes/RoleDto.html" data-type="entity-link" >RoleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RoleFactory.html" data-type="entity-link" >RoleFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateRoleDto.html" data-type="entity-link" >UpdateRoleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserDto.html" data-type="entity-link" >UserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserFactory.html" data-type="entity-link" >UserFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserNotFoundException.html" data-type="entity-link" >UserNotFoundException</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserRole.html" data-type="entity-link" >UserRole</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserRoleDto.html" data-type="entity-link" >UserRoleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserRoleFactory.html" data-type="entity-link" >UserRoleFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserSeeder.html" data-type="entity-link" >UserSeeder</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserSubscriber.html" data-type="entity-link" >UserSubscriber</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/ApiKeyMiddleware.html" data-type="entity-link" >ApiKeyMiddleware</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EmailService.html" data-type="entity-link" >EmailService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GithubAuthGuard.html" data-type="entity-link" >GithubAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtConfigService.html" data-type="entity-link" >JwtConfigService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoggerExceptionFilter.html" data-type="entity-link" >LoggerExceptionFilter</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoggerRequestInterceptor.html" data-type="entity-link" >LoggerRequestInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TransformInterceptor.html" data-type="entity-link" >TransformInterceptor</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/RolesGuard.html" data-type="entity-link" >RolesGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/AuthConfigInterface.html" data-type="entity-link" >AuthConfigInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AwsS3ConfigInterface.html" data-type="entity-link" >AwsS3ConfigInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CommonEntityInterface.html" data-type="entity-link" >CommonEntityInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EmailModuleOptionsInterface.html" data-type="entity-link" >EmailModuleOptionsInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EmailOptionsInterface.html" data-type="entity-link" >EmailOptionsInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ErrorCodeExceptionInterface.html" data-type="entity-link" >ErrorCodeExceptionInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FederatedInterface.html" data-type="entity-link" >FederatedInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GithubConfigInterface.html" data-type="entity-link" >GithubConfigInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GitHubProfileInterface.html" data-type="entity-link" >GitHubProfileInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/JwtConfigInterface.html" data-type="entity-link" >JwtConfigInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/JwtPayload.html" data-type="entity-link" >JwtPayload</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoggerConfigInterface.html" data-type="entity-link" >LoggerConfigInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoggerSentryConfigInterface.html" data-type="entity-link" >LoggerSentryConfigInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoggerTransportInterface.html" data-type="entity-link" >LoggerTransportInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Response.html" data-type="entity-link" >Response</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RoleInterface.html" data-type="entity-link" >RoleInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SendEmailServiceInterface.html" data-type="entity-link" >SendEmailServiceInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ServerConfigInterface.html" data-type="entity-link" >ServerConfigInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserCreatableInterface.html" data-type="entity-link" >UserCreatableInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserInterface.html" data-type="entity-link" >UserInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserOwnableInterface.html" data-type="entity-link" >UserOwnableInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserRoleCreatableInterface.html" data-type="entity-link" >UserRoleCreatableInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserRoleInterface.html" data-type="entity-link" >UserRoleInterface</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});