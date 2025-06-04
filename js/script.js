jQuery(document).ready(function ($) {
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(";").shift();
    }
    function getFormattedDate(date) {
        date = new Date(date);
        let year = date.getFullYear();
        let month = (1 + date.getMonth()).toString().padStart(2, "0");
        let day = date.getDate().toString().padStart(2, "0");
        return day + "/" + month + "/" + year;
    }
    $(".formCrm").submit(function (event) {
        event.preventDefault();

        let curentUser = $(this).find('input[name="curentUser"]').length >= 1 ? $(this).find('input[name="curentUser"]').get(0).value : 0,
            urlrequest = spwao_ajax_object.ajax_url,
            keystaff = "";
        let sendButtonForm = $(this).find(".buttonSubmitCRM"),
            resultForm = $(this).find(".result"),
            loaderForm = $(this).find(".loader");
        let redirectUrl = $(this).find(".redirectUrl") ? $(this).find(".redirectUrl").data("redirect") : "";
        let successMessage = $(this).find(".message").data("success") ? $(this).find(".message").data("success") : "<b>ThĂ´ng bĂ¡o:</b> Ä‘Ă£ gá»­i liĂªn há»‡ thĂ nh cĂ´ng!";
        let errorMessage = $(this).find(".message").data("error") ? $(this).find(".message").data("error") : "<b>ThĂ´ng bĂ¡o:</b> Ä‘Ă£ gá»­i liĂªn há»‡ tháº¥t báº¡i.";
        let requiredFieldMessage = $(this).find(".message").data("requiredField") ? $(this).find(".message").data("requiredField") : "<b>ThĂ´ng bĂ¡o:</b> trÆ°á»ng nĂ y lĂ  báº¯t buá»™c.";
        let invalidMessage = $(this).find(".message").data("invalid") ? $(this).find(".message").data("invalid") : "<b>ThĂ´ng bĂ¡o:</b> Ná»™i dung khĂ´ng há»£p lá»‡.";
        let loadingMessage = $(this).find(".message").data("loading") ? $(this).find(".message").data("loading") : "Äang gá»­i...";

        let sendButtonText = sendButtonForm.text();
        let listNameDOM = $(this).find(".elementor-field-label");
        let listName = [],
            encodeURIValue = "",
            listFiles = [];
        for (let i = 0; i < listNameDOM.length; i++) {
            listName.push(listNameDOM[i].innerText);
        }
        let listFileDOM = $(this).find('input[type="file"][id*="form-field-"]');
        for (let i = 0; i < listFileDOM.length; i++) {
            listFiles.push(listFileDOM[i].getAttribute("id").replace("form-field-", ""));
        }
        let valueCookieAFID = getCookie("af_id") ? getCookie("af_id") : "";
        jQuery(".cookieAFID").val(valueCookieAFID);
        let self = this;

        setTimeout(function () {
            let dataForm = new FormData(self);
            if ($(self).find("input[type=date]").length >= 1) {
                var dataDate = "",
                    dateNew = "";
                let inputDate = $(self).find("input[type=date]");
                inputDate.each(function () {
                    dataDate = $(this).attr("id").replace("form-field-", "");
                    dateNew = getFormattedDate(dataForm.get("form_fields[" + dataDate + "]"));
                    dataForm.set("form_fields[" + dataDate + "]", dateNew);
                });
            }
            dataForm.append("listNameInput", listName.toString());
            dataForm.append("listFilesInput", listFiles.toString());
            let note = [];
            if (curentUser === "52" || curentUser === "68" || curentUser === "80") {
                if (valueCookieAFID === "") {
                    keystaff = "atpsimplepage@1231234";
                    urlrequest = DOMAIN_STAFF + "/forms/wtl/" + keystaff;
                    dataForm.append("key", keystaff);
                    dataForm.append("name", dataForm.get("form_fields[name]"));
                    dataForm.append("phonenumber", dataForm.get("form_fields[phone]"));
                    dataForm.append("email", dataForm.get("form_fields[email]"));
                    dataForm.append("company", dataForm.get("projectLink"));
                    dataForm.append("af_id", dataForm.get("af_id"));
                    dataForm.append("status", "8");
                    dataForm.append("lead_source", "11");
                    for (var keyform of dataForm.keys()) {
                        if (keyform.includes("form_fields")) {
                            note.push(keyform.replace("form_fields", "") + ":" + dataForm.get(keyform));
                        }
                    }
                    dataForm.append("form-cf-1", note.join(" | "));
                } else {
                    urlrequest = DOMAIN_AFF + "/integration/submitForm";
                    for (var keyform of dataForm.keys()) {
                        if (keyform.includes("form_fields")) {
                            note.push(keyform.replace("form_fields", "") + ":" + dataForm.get(keyform));
                        }
                    }
                    let dataForm2 = {
                        product_name: dataForm.get("projectName"),
                        custommer_name: dataForm.get("form_fields[name]"),
                        custommer_phone: dataForm.get("form_fields[phone]"),
                        custommer_email: dataForm.get("form_fields[email]"),
                        custommer_note: note.join(" | "),
                        current_page_url: btoa(dataForm.get("projectLink")),
                        base_url: btoa(dataForm.get("projectLink")),
                        af_id: valueCookieAFID,
                        script_name: "general_integration",
                    };
                    dataForm = $.param(dataForm2);
                }
            }
            $.ajax({
                type: "POST",
                url: urlrequest,
                data: dataForm,
                processData: false,
                contentType: false,
                dataType: "text",
                beforeSend: () => {
                    resultForm.html("").removeClass("elementor-message elementor-message-success elementor-message-danger");
                    sendButtonForm.text(loadingMessage).css("opacity", "0.5").attr("disabled", "true");
                },
                success: function (result) {
                    console.log(result);
                    $("input[name*=form_fields]").val("");
                    try {
                        result = JSON.parse(result);
                        if (result && result.redirectUrl) {
                            if (result.encodeURIValue) {
                                encodeURIValue = result.encodeURIValue.replaceAll("%5C", "");
                                window.location.href = result.redirectUrl + encodeURIValue;
                            } else {
                                window.location.href = result.redirectUrl;
                            }
                        } else {
                            sendButtonForm.text(sendButtonText).removeAttr("disabled").css("opacity", "1");
                            resultForm.addClass("elementor-message elementor-message-success").html(successMessage);
                        }
                    } catch (e) {
                        sendButtonForm.text(sendButtonText).removeAttr("disabled").css("opacity", "1");
                        resultForm.addClass("elementor-message elementor-message-success").html(successMessage);
                    }
                },
                error: function (ResultError) {
                    console.log(ResultError);
                    $("input[name*=form_fields]").val("");
                    sendButtonForm.text(sendButtonText).removeAttr("disabled").css("opacity", "1");
                    resultForm.addClass("elementor-message elementor-message-danger").html(errorMessage);
                },
            });
        }, 500);
    });
});
